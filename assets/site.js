// Projektseite: zwei kleine Helfer, die Seite geht auch ohne sie.
// 1. Sprache des Browsers nur als Vorschlag: ein Hinweis, nie eine Umleitung.
// 2. Knopf „Kopieren“ an den Befehlen.
// Der Speicher im Browser gehört auf github.io allen Seiten des Kontos, auch der
// Demo (sie räumt Schlüssel mit „et-“ und „et.“ ab). Darum ein eigener Präfix.
(() => {
  const KEY = 'projektseite.sprache';
  const doc = document.documentElement;
  const page = (doc.lang || 'de').slice(0, 2);

  const read = () => { try { return localStorage.getItem(KEY); } catch { return null; } };
  const write = (v) => { try { localStorage.setItem(KEY, v); } catch { /* ohne Speicher: gilt nur jetzt */ } };

  const bar = document.getElementById('sprachhinweis');
  if (bar && !read()) {
    const list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    const wants = String(list[0] || '').toLowerCase().slice(0, 2);
    // Deutsche Seite: Wer zuerst keine deutsche Sprache will, bekommt den Hinweis auf Englisch.
    // Englische Seite: nur, wer zuerst Deutsch will.
    const show = wants && (page === 'de' ? wants !== 'de' : wants === 'de');
    if (show) bar.hidden = false;
  }
  if (bar) {
    bar.querySelector('[data-zu]')?.addEventListener('click', () => { bar.hidden = true; write('zu'); });
  }
  for (const a of document.querySelectorAll('a[data-sprache]')) {
    a.addEventListener('click', () => write(a.dataset.sprache));
  }

  if (navigator.clipboard && window.isSecureContext) {
    for (const btn of document.querySelectorAll('.kopier')) {
      const code = btn.parentElement.querySelector('code');
      const label = btn.textContent;
      btn.hidden = false;
      btn.setAttribute('aria-live', 'polite');
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.textContent);
          btn.textContent = btn.dataset.fertig;
          setTimeout(() => { btn.textContent = label; }, 2000);
        } catch { /* Zwischenablage gesperrt: Text bleibt markierbar */ }
      });
    }
  }
})();
