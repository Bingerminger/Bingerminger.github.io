// Die Projektseite als HTML, je Sprache eine Datei. Kein Framework, keine
// Abhängigkeit: Text kommt aus inhalt.mjs, Grafiken aus icons-app.mjs (die Datei
// der App, unverändert kopiert), Maße der Bilder aus assets/img/quellen.json und
// den SVG-Dateien selbst.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ICONS } from './icons-app.mjs';
import * as I from './inhalt.mjs';

const SITE = 'https://bingerminger.github.io/';

/** Farben der Verbrauchsarten aus der SSOT der App (src/Config/Utilities.php), wie im Logo. */
const RING = ['#22d3ee', '#10b981', '#3b82f6', '#f43f5e', '#f59e0b'];

export const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Auszeichnung wie rich() in der App: erst maskieren, dann `Code`, [Text](Adresse), **fett**. */
export function rich(s) {
  const codes = [];
  let h = esc(s).replace(/`([^`]+)`/g, (_m, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
  h = h.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, t, u) => `<a href="${u}">${t}</a>`);
  h = h.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return h.replace(/\u0000(\d+)\u0000/g, (_m, i) => `<code>${codes[Number(i)]}</code>`);
}

export function rende(lang, root) {
  const used = new Set();
  const claims = new Set();
  const pre = lang === 'en' ? '../' : '';

  /** Text einer Sprache; merkt sich die Belege. Ohne Kennung bricht der Bau ab. */
  const tx = (t) => {
    if (!t || !Array.isArray(t.c) || t.c.length === 0) throw new Error(`Aussage ohne Beleg-Kennung: ${JSON.stringify(t)}`);
    if (typeof t[lang] !== 'string' || !t[lang]) throw new Error(`Text fehlt (${lang}): ${JSON.stringify(t)}`);
    for (const c of t.c) if (c !== '-') claims.add(c);
    return t[lang];
  };
  const dc = (t) => {
    const ids = t.c.filter(c => c !== '-');
    return ids.length ? ` data-c="${ids.join(' ')}"` : '';
  };
  const R = (t) => rich(tx(t));
  const P = (t, cls = '') => `<p${cls ? ` class="${cls}"` : ''}${dc(t)}>${R(t)}</p>`;
  const ico = (name, { size = 0, cls = '', art = '' } = {}) => {
    if (!ICONS[name]) throw new Error(`Grafik fehlt: ${name}`);
    used.add(name);
    const k = ['ico', size ? `ico--${size}` : '', art ? `ico--art art-${art}` : '', cls].filter(Boolean).join(' ');
    return `<svg class="${k}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
  };
  const href = (h) => (typeof h === 'function' ? h(lang) : h);
  const A = (l, cls = 'knopf') => `<a class="${cls}${l.haupt ? ' knopf--haupt' : ''}" href="${esc(href(l.href))}"${dc(l.text)}>${esc(tx(l.text))}</a>`;

  const manifest = JSON.parse(readFileSync(join(root, 'assets/img/quellen.json'), 'utf8'));
  const dims = (file) => {
    if (file.endsWith('.svg')) {
      const head = readFileSync(join(root, file), 'utf8').slice(0, 200);
      const m = head.match(/width="(\d+)" height="(\d+)"/);
      if (!m) throw new Error(`Maße fehlen: ${file}`);
      return [Number(m[1]), Number(m[2])];
    }
    const e = manifest.bilder.find(b => b.datei === file);
    if (!e) throw new Error(`Bild nicht in quellen.json: ${file}`);
    return [e.breite, e.hoehe];
  };

  /** Bild mit Rahmen, Link auf die volle Größe und Bildunterschrift. */
  const figur = (b, { lazy = true } = {}) => {
    let src, wh, narrow = '';
    if (b.name.startsWith('wegweiser:')) {
      const n = b.name.slice(10);
      src = `assets/img/wegweiser/${n}.${lang}.svg`;
      const nsrc = `assets/img/wegweiser/${n}.${lang}.narrow.svg`;
      const [nw, nh] = dims(nsrc);
      narrow = `<source media="(max-width: 599.98px)" srcset="${pre}${nsrc}" width="${nw}" height="${nh}">`;
    } else {
      src = `assets/img/screens/${b.name}.${lang}.webp`;
    }
    wh = dims(src);
    const img = `<img src="${pre}${src}" width="${wh[0]}" height="${wh[1]}" alt="${esc(tx(b.alt))}"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
    return `<figure class="bild${b.name.startsWith('wegweiser:') ? ' bild--schaubild' : ''}"${dc(b.alt)}>`
      + `<a class="bild__rahmen" href="${pre}${src}">${narrow ? `<picture>${narrow}${img}</picture>` : img}<span class="unsichtbar"> ${esc(tx(I.UI.gross))}</span></a>`
      + (b.text ? `<figcaption${dc(b.text)}>${R(b.text)}</figcaption>` : '')
      + '</figure>';
  };

  const logo = () => {
    const cx = 12, cy = 14.3, r = 3.55, C = 2 * Math.PI * r, seg = C / RING.length, gap = 0.95;
    const ring = RING.map((c, i) => {
      const rot = -90 + (360 / RING.length) * i + (gap / 2 / C) * 360;
      return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${c}" stroke-width="2.1" stroke-dasharray="${(seg - gap).toFixed(3)} ${(C - seg + gap).toFixed(3)}" transform="rotate(${rot.toFixed(2)} ${cx} ${cy})"/>`;
    }).join('');
    return `<svg class="logo" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path class="logo__fl" d="M5 9.7 12 3.5l7 6.2v10.8H5z"/><path class="logo__ln" d="M2.8 11.7 12 3.5l9.2 8.2M5 9.7v10.8h14V9.7"/>${ring}</svg>`;
  };

  const other = lang === 'de' ? 'en' : 'de';
  const here = (l) => (l === lang ? './' : (lang === 'de' ? 'en/' : '../'));
  const sprachen = `<div class="sprache" role="group" aria-label="${esc(tx(I.UI.sprache))}">`
    + `<a href="${here('de')}" hreflang="de" lang="de"${lang === 'de' ? ' aria-current="page"' : ''} data-sprache="de">Deutsch</a>`
    + `<a href="${here('en')}" hreflang="en" lang="en"${lang === 'en' ? ' aria-current="page"' : ''} data-sprache="en">English</a></div>`;

  // ── Kopf ──────────────────────────────────────────────────────────
  const kopf = `<a class="sprung" href="#inhalt">${esc(tx(I.UI.sprung))}</a>
<div class="sprachhinweis" id="sprachhinweis" hidden lang="${other}"><div class="wrap"><div class="infobox infobox--info">${ico('globus', { size: 20 })}<p class="infobox__text">${esc(tx(I.UI.hinweis))} <a href="${here(other)}" data-sprache="${other}">${esc(tx(I.UI.hinweisLink))}</a></p><button type="button" class="knopf knopf--klein" data-zu>${esc(tx(I.UI.hinweisZu))}</button></div></div></div>
<header class="kopf"><div class="wrap kopf__innen">
<a class="marke" href="./">${logo()}<span>Energietracker</span></a>
<nav class="nav" aria-label="${esc(tx(I.UI.inhalt))}">${I.NAV.map(n => `<a href="${n.href}">${esc(tx(n.text))}</a>`).join('')}</nav>
${sprachen}
</div></header>`;

  // ── Einstieg ───────────────────────────────────────────────────────
  const shot = (n) => `${pre}assets/img/screens/${n}.${lang}.webp`;
  const [uw, uh] = dims(`assets/img/screens/uebersicht.${lang}.webp`);
  const [pw, ph] = dims(`assets/img/screens/iphone.${lang}.webp`);
  const held = `<section class="held" aria-labelledby="titel"><div class="wrap">
<h1 id="titel"${dc(I.HELD.h1)}>${R(I.HELD.h1)}</h1>
<div class="held__raster">
<div class="held__text">
${P(I.HELD.lead, 'lead')}
<ul class="fragen">${I.HELD.fragen.map(f => `<li${dc(f.text)}>${ico(f.icon, { size: 24 })}<span>${R(f.text)}</span></li>`).join('')}</ul>
<p class="knoepfe"><a class="knopf knopf--haupt knopf--gross" href="${esc(I.demo(lang))}">${esc(tx(I.HELD.demo))}</a><a class="knopf knopf--gross" href="#installieren">${esc(tx(I.HELD.install))}</a></p>
${P(I.HELD.demoNote, 'klein')}
<div class="infobox infobox--info held__neu"${dc(I.HELD.neu)}>${ico('neu', { size: 20 })}<p class="infobox__text">${R(I.HELD.neu)}</p></div>
</div>
<figure class="bild bild--held"${dc(I.HELD.bildAlt)}><a class="bild__rahmen" href="${shot('uebersicht')}"><picture>
<source media="(max-width: 599.98px) and (prefers-color-scheme: dark)" srcset="${shot('iphone-dunkel')}" width="${pw}" height="${ph}">
<source media="(max-width: 599.98px)" srcset="${shot('iphone')}" width="${pw}" height="${ph}">
<source media="(prefers-color-scheme: dark)" srcset="${shot('uebersicht-dunkel')}" width="${uw}" height="${uh}">
<img src="${shot('uebersicht')}" width="${uw}" height="${uh}" alt="${esc(tx(I.HELD.bildAlt))}" fetchpriority="high" decoding="async"></picture><span class="unsichtbar"> ${esc(tx(I.UI.gross))}</span></a>
<figcaption${dc(I.HELD.bildText)}>${R(I.HELD.bildText)}</figcaption></figure>
</div></div></section>
<section class="arten" aria-label="${esc(tx(I.ARTEN.titel).replace(/\*/g, ''))}"><div class="wrap arten__innen">
<p class="arten__titel"${dc(I.ARTEN.titel)}>${R(I.ARTEN.titel)}<br><span${dc(I.ARTEN.sprachen)}>${R(I.ARTEN.sprachen)}</span></p>
<ul class="arten__liste">${I.ARTEN.liste.map(([k, t]) => `<li${dc(t)}>${ico(`art-${k}`, { size: 20, art: k })}${esc(tx(t))}</li>`).join('')}</ul>
</div></section>`;

  // ── Wege ───────────────────────────────────────────────────────────
  const wahl = `<ul class="wahl">${I.WEGE.map(w => `<li><a href="#${w.id}">${ico(w.icon, { size: 24, art: w.art || '' })}<b>${esc(tx(w.kurz))}</b><span${dc(w.kurzText)}>${esc(tx(w.kurzText))}</span></a></li>`).join('')}</ul>`;
  const wege = I.WEGE.map(w => `<article class="weg" id="${w.id}" aria-labelledby="${w.id}-t">
<div class="weg__text">
<h3 class="weg__titel" id="${w.id}-t">${ico(w.icon, { size: 24, art: w.art || '' })}<span>${esc(tx(w.titel))}</span></h3>
${P(w.frage, 'weg__frage')}
<ul class="liste">${w.punkte.map(p => `<li${dc(p)}>${R(p)}</li>`).join('')}</ul>
<div class="infobox infobox--info"${dc(w.ehrlich)}>${ico('info', { size: 20 })}<p class="infobox__text">${R(w.ehrlich)}</p></div>
<p class="weg__links">${w.links.map((l, i) => (i === 0 ? A(l) : `<a href="${esc(href(l.href))}"${dc(l.text)}>${esc(tx(l.text))}</a>`)).join('')}</p>
</div>
<div class="weg__bilder">${w.bilder.map(b => figur(b)).join('')}</div>
</article>`).join('\n');

  const alle = `<section class="abschnitt abschnitt--flach" id="alle" aria-labelledby="alle-t"><div class="wrap">
<h2 id="alle-t">${esc(tx(I.ALLE.h2))}</h2>
${P(I.ALLE.lead, 'abschnitt__lead')}
<ul class="zeilen zeilen--3">${I.ALLE.liste.map(z => `<li${dc(z.text)}>${ico(z.icon, { size: 20 })}<span>${R(z.text)}</span></li>`).join('')}</ul>
</div></section>`;

  // ── Vertrauen ──────────────────────────────────────────────────────
  const V = I.VERTRAUEN;
  const vertrauen = `<section class="abschnitt" id="vertrauen" aria-labelledby="vertrauen-t"><div class="wrap">
<h2 id="vertrauen-t">${esc(tx(V.h2))}</h2>
${P(V.lead, 'abschnitt__lead')}
${figur({ name: 'wegweiser:together', alt: V.bildAlt, text: V.bildText })}
<ul class="zeilen zeilen--2 belege">${V.belege.map(b => `<li${dc(b.text)}>${ico(b.icon, { size: 20 })}<span>${R(b.text)} <a class="beleg" href="${esc(href(b.beleg.href))}">${esc(tx(b.beleg.text))}</a></span></li>`).join('')}</ul>
<div class="vertrauen__unten">
<div class="aussen">
<h3>${esc(tx(V.aussenH3))}</h3>
<table class="tabelle"><thead><tr>${V.aussenKopf.map(k => `<th scope="col">${esc(tx(k))}</th>`).join('')}</tr></thead>
<tbody>${V.aussen.map(row => `<tr>${row.map((cell, i) => `<${i ? 'td' : 'th scope="row"'} data-label="${esc(tx(V.aussenKopf[i]))}"${dc(cell)}>${R(cell)}</${i ? 'td' : 'th'}>`).join('')}</tr>`).join('')}</tbody></table>
${P(V.aussenNote, 'klein')}
</div>
<div class="grenzen">
<h3>${esc(tx(V.grenzenH3))}</h3>
<ul class="liste">${V.grenzen.map(g => `<li${dc(g)}>${R(g)}</li>`).join('')}</ul>
<p>${A(V.grenzenLink, 'knopf')}</p>
</div>
</div>
</div></section>`;

  // ── Installieren ───────────────────────────────────────────────────
  const N = I.INSTALL;
  const codeBlock = (text) => `<div class="code"><pre tabindex="0"><code>${esc(text)}</code></pre><button type="button" class="knopf knopf--klein kopier" hidden data-fertig="${esc(tx(I.UI.kopiert))}">${esc(tx(I.UI.kopieren))}</button></div>`;
  const install = `<section class="abschnitt abschnitt--flach" id="installieren" aria-labelledby="installieren-t"><div class="wrap">
<h2 id="installieren-t">${esc(tx(N.h2))}</h2>
${P(N.lead, 'abschnitt__lead')}
<div class="installwege">${N.wege.map(w => `<section class="install" aria-labelledby="iw-${w.icon}">
<h3 class="install__titel" id="iw-${w.icon}">${ico(w.icon, { size: 24 })}<span>${esc(tx(w.titel))}</span></h3>
${P(w.fuer, 'install__fuer')}
<ol>${w.schritte.map((s, i) => `<li${dc(s)}>${R(s)}${w.code && w.code.nach === i ? codeBlock(w.code.text) : ''}</li>`).join('')}</ol>
${w.note ? P(w.note, 'klein') : ''}
<p class="install__fuss">${A(w.link)}</p>
</section>`).join('')}</div>
<div class="infobox infobox--achtung"${dc(N.achtung)}>${ico('achtung', { size: 20 })}<p class="infobox__text">${R(N.achtung)} <a href="${esc(href(N.achtungLink.href))}">${esc(tx(N.achtungLink.text))}</a></p></div>
</div></section>`;

  // ── Vorhaben und Mitmachen ─────────────────────────────────────────
  const O = I.VORHABEN;
  const vorhaben = `<section class="abschnitt" id="vorhaben" aria-labelledby="vorhaben-t"><div class="wrap">
<h2 id="vorhaben-t">${esc(tx(O.h2))}</h2>
${P(O.lead, 'abschnitt__lead')}
<ul class="repos">${O.repos.map(r => `<li><a href="${r.href}">${ico(r.icon, { size: 24 })}<b>${esc(tx(r.name))}</b><code>${esc(r.slug)}</code><span${dc(r.text)}>${R(r.text)}</span></a></li>`).join('')}</ul>
<h3>${esc(tx(O.linksH3))}</h3>
<p class="linkreihe">${O.links.map(l => A(l)).join('')}</p>
</div></section>`;

  const M = I.MITMACHEN;
  const mitmachen = `<section class="abschnitt abschnitt--flach" id="mitmachen" aria-labelledby="mitmachen-t"><div class="wrap">
<h2 id="mitmachen-t">${esc(tx(M.h2))}</h2>
${P(M.lead, 'abschnitt__lead')}
<ul class="zeilen zeilen--2">${M.liste.map(m => `<li${dc(m.text)}>${ico(m.icon, { size: 20 })}<span>${R(m.text)} <a href="${esc(href(m.href))}">${esc(tx(m.linkText))}</a></span></li>`).join('')}</ul>
</div></section>`;

  // ── Fuß ────────────────────────────────────────────────────────────
  const F = I.FUSS;
  const fuss = `<footer class="fuss"><div class="wrap fuss__raster">
<div><a class="marke" href="./">${logo()}<span>Energietracker</span></a>
${P(F.lizenz)}</div>
<div>${P(F.seite)}${P(F.marken)}
<p class="klein"${dc(F.schrift)}>${R(F.schrift)} <a href="${pre}assets/fonts/OFL.txt">OFL</a>. <a href="${I.REPO}/blob/main/TRADEMARKS.md">${esc(tx(F.marke))}</a>. <a href="${I.REPO}/blob/main/LICENSE">${esc(tx(F.lizenzLink))}</a>.</p></div>
${sprachen}
</div></footer>`;

  const main = `<main id="inhalt">
${held}
<section class="abschnitt" id="wege" aria-labelledby="wege-t"><div class="wrap">
<h2 id="wege-t">${esc(tx(I.WAHL.h2))}</h2>
${P(I.WAHL.lead, 'abschnitt__lead')}
${wahl}
${wege}
</div></section>
${alle}
${vertrauen}
${install}
${vorhaben}
${mitmachen}
</main>`;

  // Sprite zuletzt, damit es nur die benutzten Grafiken enthält
  const body = kopf + main + fuss;
  const sprite = `<svg class="sprite" aria-hidden="true" focusable="false"><defs>${[...used].sort().map(k => `<symbol id="i-${k}" viewBox="0 0 24 24">${ICONS[k]}</symbol>`).join('')}</defs></svg>`;
  const url = lang === 'de' ? SITE : `${SITE}en/`;
  const head = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(tx(I.META.title))}</title>
<meta name="description" content="${esc(tx(I.META.description))}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#111827" media="(prefers-color-scheme: dark)">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="de" href="${SITE}">
<link rel="alternate" hreflang="en" href="${SITE}en/">
<link rel="alternate" hreflang="x-default" href="${SITE}">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(tx(I.META.title))}">
<meta property="og:description" content="${esc(tx(I.META.description))}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}assets/img/vorschau.${lang}.png">
<meta property="og:locale" content="${lang === 'de' ? 'de_DE' : 'en_GB'}">
<link rel="icon" href="${pre}favicon.ico" sizes="any">
<link rel="icon" href="${pre}assets/img/logo.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${pre}assets/img/apple-touch-icon.png">
<link rel="preload" href="${pre}assets/fonts/dm-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${pre}assets/site.css">
<script src="${pre}assets/site.js" defer></script>
</head>
<body>
`;
  return { html: `${head}${sprite}\n${body}\n</body>\n</html>\n`, claims };
}
