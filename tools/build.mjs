// Baut die Projektseite und prüft ihre Regeln.
//
//   node tools/build.mjs           schreibt index.html, en/index.html, 404.html
//   node tools/build.mjs --check   schreibt nichts, bricht ab, wenn eine Regel verletzt ist
//                                  oder die Dateien nicht zum Quelltext passen
//
// Regeln (Auftrag und Designsprache der App):
//  R1  keine Ressourcen von außen: src, srcset, Stylesheets, Skripte, Schriften, url() nur lokal
//  R2  jede lokale Datei, auf die die Seite zeigt, gibt es
//  R3  öffentliche Texte ohne Gedankenstrich (– —) und ohne Mittelpunkt (·) als Trenner
//  R4  keine Beträge (€, EUR) und keine Download-, Nutzer- oder Sternzahlen
//  R5  jede Aussage hat eine Kennung, jede Kennung steht in aussagen.md, jede Zeile dort wird benutzt,
//      Deutsch und Englisch belegen dieselben Kennungen
//  R6  jedes Bild hat einen Alternativtext und feste Maße
//  R7  CSS: Farbwerte nur in den Token-Blöcken, keine Großschrift, keine Sperrung, nur drei Radien
//  R8  höchstens eine Fettung je Absatz, Listenpunkt oder Bildunterschrift
//  R9  ein h1 je Seite, Sprache gesetzt, Sprachfassungen verknüpft
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { rende } from '../src/seite.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK = process.argv.includes('--check');
const fail = [];
const bad = (rule, msg) => fail.push(`${rule}: ${msg}`);

const pages = {};
const claims = {};
for (const lang of ['de', 'en']) {
  const r = rende(lang, ROOT);
  pages[lang === 'de' ? 'index.html' : 'en/index.html'] = r.html;
  claims[lang] = r.claims;
}
pages['404.html'] = seite404();

function seite404() {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Seite nicht gefunden | Page not found</title>
<meta name="robots" content="noindex">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="stylesheet" href="/assets/site.css">
</head>
<body>
<main id="inhalt" class="abschnitt"><div class="wrap">
<h1>Seite nicht gefunden</h1>
<p class="lead">Diese Adresse gibt es hier nicht. <a href="/">Zur Startseite</a> oder <a href="https://bingerminger.github.io/energietracker/">zur Demo</a>.</p>
<p class="lead" lang="en">This address does not exist here. <a href="/en/">To the home page</a> or <a href="https://bingerminger.github.io/energietracker/?lang=en">to the demo</a>.</p>
</div></main>
</body>
</html>
`;
}

// ── R1, R2, R6, R9: Verweise und Bilder ────────────────────────────
for (const [file, html] of Object.entries(pages)) {
  const base = dirname(join(ROOT, file));
  const attr = (re) => [...html.matchAll(re)].map(m => m[1]);
  const loaded = [
    ...attr(/<(?:img|script|source)\b[^>]*\ssrc="([^"]+)"/g),
    ...attr(/\ssrcset="([^"]+)"/g).flatMap(s => s.split(',').map(x => x.trim().split(/\s+/)[0])),
    ...[...html.matchAll(/<link\b([^>]*)>/g)]
      .filter(m => /rel="(?:stylesheet|icon|preload|apple-touch-icon|manifest|modulepreload)"/.test(m[1]))
      .map(m => (m[1].match(/href="([^"]+)"/) || [])[1]),
  ];
  for (const u of loaded) {
    if (!u) continue;
    if (/^(?:[a-z]+:)?\/\//i.test(u) || /^data:/i.test(u)) { bad('R1', `${file} lädt von außen: ${u}`); continue; }
    const p = u.startsWith('/') ? join(ROOT, u) : resolve(base, u);
    if (!existsSync(p.replace(/[?#].*$/, ''))) bad('R2', `${file} zeigt auf fehlende Datei: ${u}`);
  }
  for (const u of attr(/<a\b[^>]*\shref="([^"]+)"/g)) {
    if (/^(?:https?:|mailto:|#)/.test(u)) continue;
    let p = u.startsWith('/') ? join(ROOT, u) : resolve(base, u);
    p = p.replace(/[?#].*$/, '');
    if (u.endsWith('/') || u === './' || u === '../') p = join(p, 'index.html');
    const erzeugt = Object.keys(pages).some(f => join(ROOT, f) === p);
    if (!erzeugt && !existsSync(p)) bad('R2', `${file} verlinkt fehlende Datei: ${u}`);
  }
  // Vorschaubild für Links: eigene Adresse, die Datei muss im Repo liegen
  for (const u of attr(/<meta property="og:image" content="([^"]+)"/g)) {
    const local = u.replace(/^https:\/\/bingerminger\.github\.io\//, '');
    if (local === u) bad('R1', `${file}: Vorschaubild nicht auf der eigenen Seite: ${u}`);
    else if (!existsSync(join(ROOT, local))) bad('R2', `${file}: Vorschaubild fehlt: ${local} (node tools/vorschau.mjs)`);
  }
  // Sprungmarken innerhalb der Seite
  const ids = new Set(attr(/\sid="([^"]+)"/g));
  for (const u of attr(/\shref="#([^"]+)"/g)) if (!ids.has(u)) bad('R2', `${file}: Sprungmarke #${u} fehlt`);
  for (const use of attr(/<use href="#([^"]+)"/g)) if (!ids.has(use)) bad('R2', `${file}: Grafik #${use} fehlt im Sprite`);
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\salt="[^"]+"/.test(tag)) bad('R6', `${file}: Bild ohne Alternativtext: ${tag.slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) bad('R6', `${file}: Bild ohne Maße: ${tag.slice(0, 80)}`);
  }
  if (file !== '404.html') {
    if ((html.match(/<h1\b/g) || []).length !== 1) bad('R9', `${file}: nicht genau ein h1`);
    if (!/<html lang="(de|en)">/.test(html)) bad('R9', `${file}: Sprache fehlt`);
    if (!/hreflang="de"/.test(html) || !/hreflang="en"/.test(html)) bad('R9', `${file}: Sprachfassungen nicht verknüpft`);
  }
}

// ── R3, R4, R8: Text ───────────────────────────────────────────────
const sichtbar = (html) => html
  .replace(/<svg class="sprite"[\s\S]*?<\/svg>/, '')
  .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, '')
  .replace(/<[^>]+\s(?:alt|content|aria-label|title)="([^"]*)"[^>]*>/g, ' $1 ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const texte = { ...pages, 'aussagen.md': readFileSync(join(ROOT, 'aussagen.md'), 'utf8') };
for (const [file, content] of Object.entries(texte)) {
  const text = file.endsWith('.html') ? sichtbar(content) : content;
  for (const [ch, name] of [['\u2013', 'Halbgeviertstrich'], ['\u2014', 'Geviertstrich'], ['\u00b7', 'Mittelpunkt']]) {
    const i = text.indexOf(ch);
    if (i >= 0) bad('R3', `${file}: ${name} in „${text.slice(Math.max(0, i - 30), i + 30).replace(/\s+/g, ' ')}“`);
  }
  if (file.endsWith('.html')) {
    if (/€|\bEUR\b/.test(text)) bad('R4', `${file}: Betrag im Text`);
    const zahl = text.match(/\d[\d.,]*\s*(?:Downloads?|Sterne|Stars?|Nutzer\w*|Nutzerinnen|users?|installs?|Installationen)\b/i);
    if (zahl) bad('R4', `${file}: Zahl von Nutzern oder Downloads: ${zahl[0]}`);
  }
}
for (const [file, html] of Object.entries(pages)) {
  for (const m of html.matchAll(/<(p|li|figcaption)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    const n = (m[2].match(/<strong>/g) || []).length;
    if (n > 1) bad('R8', `${file}: ${n} Fettungen in „${sichtbar(m[2]).trim().slice(0, 60)}“`);
  }
}

// ── R5: Belege ─────────────────────────────────────────────────────
const aussagen = readFileSync(join(ROOT, 'aussagen.md'), 'utf8');
const belegt = new Set([...aussagen.matchAll(/^\| `([a-z0-9-]+)` \|/gm)].map(m => m[1]));
const benutzt = new Set([...claims.de, ...claims.en]);
for (const c of benutzt) if (!belegt.has(c)) bad('R5', `Kennung ohne Beleg in aussagen.md: ${c}`);
for (const c of belegt) if (!benutzt.has(c)) bad('R5', `Zeile in aussagen.md, die keine Seite benutzt: ${c}`);
for (const c of claims.de) if (!claims.en.has(c)) bad('R5', `nur Deutsch belegt: ${c}`);
for (const c of claims.en) if (!claims.de.has(c)) bad('R5', `nur Englisch belegt: ${c}`);

// ── R7: CSS ────────────────────────────────────────────────────────
const css = readFileSync(join(ROOT, 'assets/site.css'), 'utf8');
const [, rest = ''] = css.split('/* ── Ende der Tokens ── */');
if (!rest) bad('R7', 'Marke „Ende der Tokens“ fehlt in site.css');
const hex = rest.match(/#[0-9a-f]{3,8}\b/i);
if (hex) bad('R7', `Farbwert außerhalb der Tokens: ${hex[0]}`);
if (/rgba?\(/.test(rest)) bad('R7', 'rgb()/rgba() außerhalb der Tokens');
if (/text-transform\s*:\s*uppercase/i.test(css)) bad('R7', 'Großschrift (text-transform: uppercase)');
if (/letter-spacing/i.test(css)) bad('R7', 'Sperrung (letter-spacing)');
for (const m of css.matchAll(/border-radius\s*:\s*([^;]+);/g)) {
  if (!/^var\(--r-(sm|md)\)$/.test(m[1].trim())) bad('R7', `Radius außerhalb der drei Stufen: ${m[1]}`);
}
for (const m of css.matchAll(/url\(([^)]+)\)/g)) {
  const u = m[1].replace(/["']/g, '');
  if (/^(?:[a-z]+:)?\/\//i.test(u)) bad('R1', `site.css lädt von außen: ${u}`);
  else if (!existsSync(resolve(join(ROOT, 'assets'), u))) bad('R2', `site.css: Datei fehlt: ${u}`);
}
const js = readFileSync(join(ROOT, 'assets/site.js'), 'utf8');
if (/https?:\/\/|fetch\(|XMLHttpRequest|import\(/.test(js)) bad('R1', 'site.js spricht mit einem Server');

// ── Schreiben oder vergleichen ─────────────────────────────────────
if (CHECK) {
  for (const [file, html] of Object.entries(pages)) {
    const p = join(ROOT, file);
    if (!existsSync(p) || readFileSync(p, 'utf8') !== html) bad('Bau', `${file} passt nicht zum Quelltext: node tools/build.mjs`);
  }
} else {
  for (const [file, html] of Object.entries(pages)) {
    mkdirSync(dirname(join(ROOT, file)), { recursive: true });
    writeFileSync(join(ROOT, file), html);
  }
}

if (fail.length) {
  console.error(`${fail.length} Regelverstöße:\n  ${fail.join('\n  ')}`);
  process.exit(1);
}
console.log(`${CHECK ? 'geprüft' : 'gebaut'}: ${Object.keys(pages).join(', ')}; ${belegt.size} belegte Aussagen; Regeln R1 bis R9 eingehalten`);
