// Bilder und Schriften der Projektseite aus dem Haupt-Repo holen.
//
//   NODE_PATH=<Ordner mit playwright> node tools/bilder.mjs     (ET_REPO=../energietracker)
//
// Liest nur. Schneidet die Aufnahmen der Oberfläche (docs/ui/screenshots,
// docs/assets/promo/screens) zu und schreibt sie als WebP nach
// assets/img/screens/. Kodiert wird im Browser (Canvas → image/webp), damit
// kein weiteres Werkzeug nötig ist. Dazu kommen die Schaubilder des Wegweisers,
// Logo, Favicon und die Schriften DM Sans und DM Mono (SIL OFL 1.1).
// Woher jedes Bild kommt, steht danach in assets/img/quellen.json.
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ET = resolve(process.env.ET_REPO || join(ROOT, '../energietracker'));
const require = createRequire(`${process.env.NODE_PATH || process.cwd()}/x`);

const SHOTS = 'docs/ui/screenshots';
const PROMO = 'docs/assets/promo/screens';
const en = (p) => p.replace(`${SHOTS}/`, `${SHOTS}/en/`);

/** name, Quelle je Sprache, Ausschnitt [x, y, b, h] in Pixeln der Aufnahme, Zielbreite */
const JOBS = [
  { name: 'uebersicht', de: `${PROMO}/uebersicht.de.png`, en: `${PROMO}/uebersicht.en.png`, width: 1440 },
  { name: 'uebersicht-dunkel', de: `${PROMO}/uebersicht-dunkel.de.png`, en: `${PROMO}/uebersicht-dunkel.en.png`, width: 1440 },
  { name: 'iphone', de: `${PROMO}/iphone.de.png`, en: `${PROMO}/iphone.en.png`, width: 780 },
  { name: 'iphone-dunkel', de: `${PROMO}/iphone-dunkel.de.png`, en: `${PROMO}/iphone-dunkel.en.png`, width: 780 },
  { name: 'strom', de: `${SHOTS}/strom-view.png`, crop: [220, 48, 1220, 620] },
  { name: 'werkstatt-pv', de: `${SHOTS}/werkstatt-pv.png`, crop: [624, 834, 792, 572], cropEn: [624, 818, 792, 586] },
  { name: 'messkonzept', de: `${SHOTS}/messkonzept.png`, crop: [230, 140, 980, 610] },
  { name: 'gas', de: `${SHOTS}/gas-view.png`, crop: [220, 48, 1220, 600], cropEn: [220, 48, 1220, 582] },
  { name: 'heizoel-tank', de: `${SHOTS}/heizoel-view.png`, crop: [240, 760, 1180, 470] },
  { name: 'miete', de: 'tools/quellen/miete.de.png', en: 'tools/quellen/miete.en.png', local: true, crop: [220, 48, 1220, 780] },
  { name: 'verbindungen', de: `${SHOTS}/verbindungen.png`, crop: [220, 48, 1220, 762] },
  { name: 'rechte', de: `${SHOTS}/rechte-hinweis.png`, crop: [220, 48, 1220, 770] },
  { name: 'brief', de: `${SHOTS}/brief-dialog.png`, crop: [235, 40, 970, 810] },
  { name: 'ki', de: `${SHOTS}/ki-assistenten.png`, crop: [220, 48, 1220, 800] },
];

const WEGWEISER = ['together', 'local-ai', 'home-assistant'];
const FONTS = ['dm-sans.woff2', 'dm-sans-ziffern.woff2', 'dm-mono-400.woff2', 'OFL.txt'];

const commit = execFileSync('git', ['-C', ET, 'rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
const out = (...p) => join(ROOT, ...p);
mkdirSync(out('assets/img/screens'), { recursive: true });
mkdirSync(out('assets/img/wegweiser'), { recursive: true });
mkdirSync(out('assets/fonts'), { recursive: true });

const { chromium } = require('playwright');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent('<!doctype html><body></body>');

const manifest = { commit, bilder: [] };
for (const job of JOBS) {
  for (const lang of ['de', 'en']) {
    const rel = job[lang] || en(job.de);
    const file = job.local ? out(rel) : join(ET, rel);
    const dataUrl = `data:image/png;base64,${readFileSync(file).toString('base64')}`;
    const crop = (lang === 'en' && job.cropEn) || job.crop;
    const res = await page.evaluate(async ({ dataUrl, crop, width }) => {
      const img = new Image();
      img.src = dataUrl;
      await img.decode();
      const [x, y, w, h] = crop || [0, 0, img.naturalWidth, img.naturalHeight];
      const tw = width || w;
      const th = Math.round(h * tw / w);
      const c = document.createElement('canvas');
      c.width = tw; c.height = th;
      const g = c.getContext('2d');
      g.imageSmoothingQuality = 'high';
      g.drawImage(img, x, y, w, h, 0, 0, tw, th);
      return { url: c.toDataURL('image/webp', 0.84), w: tw, h: th, src: [img.naturalWidth, img.naturalHeight] };
    }, { dataUrl, crop, width: job.width });
    const target = `assets/img/screens/${job.name}.${lang}.webp`;
    writeFileSync(out(target), Buffer.from(res.url.split(',')[1], 'base64'));
    manifest.bilder.push({ datei: target, quelle: job.local ? rel : `energietracker/${rel}`, ausschnitt: crop || null, breite: res.w, hoehe: res.h });
  }
}
await browser.close();

for (const name of WEGWEISER) {
  for (const lang of ['de', 'en']) {
    for (const v of ['', '.narrow']) {
      const f = `${name}.${lang}${v}.svg`;
      copyFileSync(join(ET, 'docs/ui/wegweiser', f), out('assets/img/wegweiser', f));
      manifest.bilder.push({ datei: `assets/img/wegweiser/${f}`, quelle: `energietracker/docs/ui/wegweiser/${f}` });
    }
  }
}
for (const f of FONTS) copyFileSync(join(ET, 'public/vendor/fonts', f), out('assets/fonts', f));
copyFileSync(join(ET, 'docs/assets/promo/logo.svg'), out('assets/img/logo.svg'));
// Die Grafiken der App, unverändert: die Seite rendert daraus ihr eigenes Sprite (src/seite.mjs).
copyFileSync(join(ET, 'public/js/lib/icons.js'), out('src/icons-app.mjs'));
copyFileSync(join(ET, 'public/favicon.ico'), out('favicon.ico'));
copyFileSync(join(ET, 'public/img/icon-light-180.png'), out('assets/img/apple-touch-icon.png'));

writeFileSync(out('assets/img/quellen.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`${manifest.bilder.length} Bilder aus energietracker@${commit}`);
