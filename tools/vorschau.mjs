// Vorschaubild für Links (og:image), je Sprache 1200 × 630, aus der Seite selbst:
// Logo, die Kernaussage und das Bild der Übersicht, im hellen Thema.
//
//   NODE_PATH=<Ordner mit playwright> node tools/vorschau.mjs     (nach tools/build.mjs)
import { createRequire } from 'node:module';
import { writeFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { HELD } from '../src/inhalt.mjs';
import { rich } from '../src/seite.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(`${process.env.NODE_PATH || process.cwd()}/x`);
const { chromium } = require('playwright');

const browser = await chromium.launch();
for (const lang of ['de', 'en']) {
  const html = `<!doctype html><html lang="${lang}"><head><meta charset="utf-8">
<link rel="stylesheet" href="assets/site.css">
<style>
  body { margin: 0; width: 1200px; height: 630px; overflow: hidden; background: var(--bg-0); }
  .karte { display: grid; grid-template-columns: 520px 1fr; gap: 40px; height: 630px; padding: 56px 0 0 64px; box-sizing: border-box; }
  .karte h1 { font-size: 58px; margin: 28px 0 24px; max-width: none; }
  .karte .lead { font-size: 22px; max-width: none; }
  .karte .marke { font-size: 22px; padding: 0; }
  .karte .logo { width: 40px; height: 40px; }
  .karte .bild__rahmen { width: 820px; border-radius: var(--r-md); }
</style></head><body>
<div class="karte"><div>
<span class="marke"><img class="logo" src="assets/img/logo.svg" alt="">Energietracker</span>
<h1>${rich(HELD.h1[lang])}</h1>
<p class="lead">${rich(HELD.lead[lang])}</p>
</div><div><span class="bild__rahmen"><img src="assets/img/screens/uebersicht.${lang}.webp" alt=""></span></div></div>
</body></html>`;
  const tmp = join(ROOT, `.vorschau-${lang}.html`);
  writeFileSync(tmp, html);
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: 'light' });
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(ROOT, `assets/img/vorschau.${lang}.png`) });
  await page.close();
  rmSync(tmp);
}
await browser.close();
console.log('Vorschaubilder geschrieben: assets/img/vorschau.de.png, assets/img/vorschau.en.png');
