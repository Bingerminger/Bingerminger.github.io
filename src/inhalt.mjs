// Inhalt der Projektseite, Deutsch und Englisch nebeneinander.
//
// Jede Aussage trägt die Kennungen ihrer Belege (`c`), die in aussagen.md stehen.
// `-` heißt: keine Tatsachenbehauptung (Navigation, Überschrift, Aufforderung).
// Auszeichnung wie in der App (rich): **fett**, `Code`, [Text](Adresse).
// Regeln: keine Gedankenstriche, kein Mittelpunkt als Trenner, keine Sparbeträge,
// keine Download- oder Nutzerzahlen. tools/build.mjs --check prüft das.

export const REPO = 'https://github.com/Bingerminger/energietracker';
export const REPO_HA = 'https://github.com/Bingerminger/energietracker-ha';
export const REPO_HACS = 'https://github.com/Bingerminger/energietracker-hacs';
export const DEMO = 'https://bingerminger.github.io/energietracker/';
export const HA_ADD = 'https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FBingerminger%2Fenergietracker-ha';
export const HACS_OPEN = 'https://my.home-assistant.io/redirect/hacs_repository/?owner=Bingerminger&repository=energietracker-hacs&category=integration';
export const KAFFEE = 'https://buymeacoffee.com/bingerminger';


/** Handbuchseite: Deutsch unter docs/, Englisch unter docs/en/ */
export const doc = (lang, path, anchor = '') => `${REPO}/blob/main/docs/${lang === 'en' ? 'en/' : ''}${path}${anchor}`;
/** Datei im Hauptrepo, je Sprache eine eigene Fassung möglich */
export const datei = (lang, de, en = de) => `${REPO}/blob/main/${lang === 'en' ? en : de}`;
/** Sprung in die öffentliche Demo: Beispielhaushalt, Sprache, Ansicht */
export const demo = (lang, persona = '', route = '') =>
  `${DEMO}?${persona ? `persona=${persona}&` : ''}lang=${lang}${route ? `#${route}` : ''}`;

const T = (de, en, c) => ({ de, en, c });

export const META = {
  title: T('Energietracker: Energie- und Wasserkosten, selbst gehostet', 'Energietracker: energy and water costs, self-hosted', ['-']),
  description: T(
    'Zählerstände rein, Antworten raus: Saldo, Rechnung prüfen, Wechsel und Prognose für Strom, Gas, Wasser, Wärme und PV. Offener Code, ohne Konto, deine Daten bleiben bei dir.',
    'Meter readings in, answers out: balance, bill check, switching and forecast for electricity, gas, water, heat and PV. Open source, no account, your data stays with you.',
    ['tagline', 'saldo', 'rechnung-pruefen', 'wechsel', 'arten', 'agpl', 'daten-bleiben']),
};

export const NAV = [
  { href: '#wege', text: T('Für wen', 'Use cases', ['-']) },
  { href: '#vertrauen', text: T('Vertrauen', 'Trust', ['-']) },
  { href: '#installieren', text: T('Installieren', 'Install', ['-']) },
  { href: '#mitmachen', text: T('Mitmachen', 'Get involved', ['-']) },
];

export const UI = {
  sprung: T('Zum Inhalt springen', 'Skip to content', ['-']),
  sprache: T('Sprache', 'Language', ['-']),
  hinweis: T('This page is also available in English.', 'Diese Seite gibt es auch auf Deutsch.', ['-']),
  hinweisLink: T('Read in English', 'Auf Deutsch lesen', ['-']),
  hinweisZu: T('Close', 'Schließen', ['-']),
  kopieren: T('Kopieren', 'Copy', ['-']),
  kopiert: T('Kopiert', 'Copied', ['-']),
  gross: T('Bild in voller Größe öffnen', 'Open the picture at full size', ['-']),
  inhalt: T('Abschnitte', 'Sections', ['-']),
};

export const HELD = {
  h1: T('Zählerstände rein, Antworten raus.', 'Meter readings in, answers out.', ['tagline']),
  lead: T(
    '**Der Energietracker rechnet deine Energie- und Wasserkosten so, wie die Abrechnung es tut.** Selbst gehostet, ohne Konto und ohne Datenbank. Deine Daten bleiben bei dir.',
    '**Energietracker works out your energy and water costs the way the bill does.** Self-hosted, no account and no database. Your data stays with you.',
    ['wie-abrechnung', 'tagline', 'daten-bleiben']),
  fragen: [
    { icon: 'geld', text: T(
      '**Bekomme ich Geld zurück?** Saldo je Vertrag: gemessen bis zur letzten Ablesung, geschätzt bis heute, erwartet bei der Abrechnung, mit ehrlicher Spanne.',
      '**Will I get money back?** Balance per contract: measured up to the last reading, estimated up to today, expected at the bill, with an honest range.',
      ['saldo']) },
    { icon: 'beleg', text: T(
      '**Stimmt die Rechnung?** „Rechnung prüfen“ rechnet die Versorgerrechnung Abschnitt für Abschnitt nach: Menge, Preis, Verbrauchs- und feste Kosten.',
      '**Is the bill right?** “Check a bill” recalculates the supplier’s bill section by section: quantity, price, consumption and fixed costs.',
      ['rechnung-pruefen']) },
    { icon: 'etikett', text: T(
      '**Lohnt der Wechsel?** Mit Wechseltermin aus Vertragsende und Kündigungsfrist, Gewinnschwelle und den Preisen ab dem zweiten Jahr.',
      '**Is switching worth it?** With the switching date from contract end and notice period, the break-even point and the prices from the second year.',
      ['wechsel']) },
  ],
  demo: T('Demo im Browser ansehen', 'Try the demo in your browser', ['-']),
  install: T('Installieren', 'Install', ['-']),
  demoNote: T(
    'Die Demo läuft ganz im Browser, mit erfundenen Beispielhaushalten. Du musst nichts installieren.',
    'The demo runs entirely in your browser, with invented sample households. Nothing to install.',
    ['demo-browser', 'bsp-erfunden']),
  bildAlt: T(
    'Übersicht des Beispielhaushalts: Was ist zu tun? Bekomme ich Geld zurück? Mehr oder weniger als im Vorjahr? Darunter eine Kachel je Verbrauchsart mit Trend.',
    'Overview of the sample household: What needs doing? Will I get money back? More or less than last year? Below, one tile per utility with its trend.',
    ['uebersicht']),
  neu: T(
    '**Neu in 3.12.0:** Deine KI fragt im Energietracker nach, Home Assistant bekommt Sensoren über HACS, und die Oberfläche ist neu. [Zur KI](#ki)',
    '**New in 3.12.0:** your AI can ask Energietracker, Home Assistant gets sensors through HACS, and the interface is new. [To the AI](#ki)',
    ['neu-312']),
  bildText: T(
    '**Die Übersicht antwortet zuerst.** Beispielhaushalt, alle Zahlen erfunden.',
    '**The overview answers first.** Sample household, all figures invented.',
    ['uebersicht', 'bsp-erfunden']),
};

export const ARTEN = {
  titel: T('**Neun Verbrauchsarten, sieben Sprachen.**', '**Nine utilities, seven languages.**', ['arten', 'sprachen']),
  sprachen: T(
    'Deutsch, Englisch, Französisch, Italienisch, Spanisch, Portugiesisch und Niederländisch.',
    'German, English, French, Italian, Spanish, Portuguese and Dutch.',
    ['sprachen']),
  liste: [
    ['gas', T('Gas', 'Gas', ['arten'])],
    ['strom', T('Strom', 'Electricity', ['arten'])],
    ['wasser', T('Wasser', 'Water', ['arten'])],
    ['fernwaerme', T('Fernwärme', 'District heating', ['arten'])],
    ['heizoel', T('Heizöl', 'Heating oil', ['arten'])],
    ['pellets', T('Pellets', 'Pellets', ['arten'])],
    ['pv_einspeisung', T('PV-Einspeisung', 'PV feed-in', ['arten'])],
    ['pv_erzeugung', T('PV-Erzeugung', 'PV generation', ['arten'])],
    ['waerme', T('Heizwärme', 'Heat', ['arten'])],
  ],
};

export const WAHL = {
  h2: T('Wo stehst du?', 'Where do you stand?', ['-']),
  lead: T(
    '**Such dir deinen Fall aus.** Jeder Weg zeigt, was du bekommst, wie es aussieht und wo es weitergeht.',
    '**Pick your case.** Each path shows what you get, what it looks like and where to go next.',
    ['-']),
};

/** Die sechs Wege. `bilder`: Name unter assets/img/screens (WebP) oder wegweiser:<name> (Schaubild). */
export const WEGE = [
  {
    id: 'haus-wp', icon: 'art-pv_erzeugung', art: 'pv_erzeugung',
    kurz: T('Haus mit Wärmepumpe und PV', 'Home with heat pump and PV', ['-']),
    kurzText: T('Speicher, Wallbox, Viertelstunden', 'Battery, wallbox, quarter hours', ['pv', 'evcc', 'viertelstunden']),
    titel: T('Haus mit Wärmepumpe, PV, Speicher und E-Auto', 'Home with heat pump, PV, battery and electric car', ['-']),
    frage: T(
      '**Was bringt dir die Sonne, und was kostet die Wärmepumpe?** Der Energietracker rechnet nach, was Home Assistant, evcc und dein Speicher tun. Er steuert nichts.',
      '**What does the sun bring you, and what does the heat pump cost?** Energietracker recalculates what Home Assistant, evcc and your battery do. It controls nothing.',
      ['steuert-nicht']),
    punkte: [
      T('**Jeder Vertrag zahlt nur seinen Teil.** Der Assistent für das Messkonzept kennt Subzähler und Kaskade, auch mit Wärmepumpe und HT/NT.',
        '**Every contract pays only its share.** The metering concept assistant knows sub-meters and cascades, also with heat pump and peak/off-peak.',
        ['messkonzept']),
      T('**Viertelstunden statt Monatssummen,** aus Home Assistant oder aus Dateien des Netzbetreibers. Die Seite Flexibilität rechnet nach, ob Verschieben etwas gebracht hat.',
        '**Quarter hours instead of monthly totals,** from Home Assistant or from your grid operator’s files. The Flexibility page checks whether shifting paid off.',
        ['viertelstunden', 'flex']),
      T('**PV und Wärmepumpe in Zahlen:** Eigenverbrauch, Autarkie, Speicher mit Verlusten, Amortisation und die Jahresarbeitszahl.',
        '**PV and heat pump in figures:** self-consumption, self-sufficiency, battery with losses, payback and the seasonal performance factor.',
        ['pv', 'jaz']),
      T('**Was wäre wenn?** Größere Anlage, Speicher, mehr Eigenverbrauch: Die Werkstatt rechnet es aus deinem gemessenen Jahr.',
        '**What if?** A larger system, a battery, more self-consumption: the workshop works it out from your measured year.',
        ['werkstatt-pv']),
      T('**Das E-Auto:** Ladevorgänge aus evcc und ein Ladestrom-Nachweis für den Dienstwagen.',
        '**The electric car:** charging sessions from evcc and a charging record for the company car.',
        ['evcc', 'ladestrom']),
    ],
    ehrlich: T(
      '**Noch nicht da:** Die Prognose für Wärmepumpe, PV und Speicher nach dem Wetter kommt mit v3.13, geplant für den 17.11.2026. Bis dahin nimmt die Werkstatt das zuletzt gemessene Jahr, ohne ein Jahr Viertelstunden als Spanne.',
      '**Not there yet:** the weather-based forecast for heat pump, PV and battery comes with v3.13, planned for 17 Nov 2026. Until then the workshop uses the last measured year, as a range without a full year of quarter hours.',
      ['grenze-wp-wetter', 'grenze-pv-spanne']),
    links: [
      { href: (l) => demo(l, 'showcase', '/utility/strom'), text: T('Strom im Beispielhaushalt', 'Electricity in the sample household', ['demo-routen']), haupt: true },
      { href: (l) => doc(l, 'anleitungen/anwendungsfaelle.md'), text: T('Anwendungsfälle im Handbuch', 'Use cases in the handbook', ['-']) },
      { href: (l) => doc(l, 'anleitungen/flexibilitaet.md'), text: T('Flexibilität bewerten', 'Assessing flexibility', ['-']) },
    ],
    bilder: [
      { name: 'messkonzept', alt: T(
        'Assistent Messkonzept einrichten, Schritt 2 von 5: drei Schaubilder für zwei Zähler nebeneinander, Subzähler dahinter und Kaskade.',
        'Assistant Set up metering concept, step 2 of 5: three diagrams for two meters side by side, sub-meter behind and cascade.',
        ['messkonzept']),
        text: T('Der Assistent fragt nach dem Aufbau, nicht nach Fachwörtern.', 'The assistant asks about the layout, not about technical terms.', ['messkonzept']) },
      { name: 'werkstatt-pv', alt: T(
        'Werkstatt bei der PV, Beispiel Speicher dazu: Tabelle je Monat mit Erzeugung, selbst genutzt, eingespeist, Netzbezug und Autarkie vorher und nachher, darunter die zwei Grenzen der Spanne.',
        'Workshop for PV, example add a battery: table per month with generation, used at home, fed in, grid import and self-sufficiency before and after, below it the two bounds of the range.',
        ['werkstatt-pv', 'grenze-pv-spanne']),
        text: T('Modellwerte mit genannter Grundlage. Beispielhaushalt, alle Zahlen erfunden.', 'Model values with their basis named. Sample household, all figures invented.', ['werkstatt-pv', 'bsp-erfunden']) },
    ],
  },
  {
    id: 'heizen', icon: 'art-gas', art: 'gas',
    kurz: T('Heizen mit Gas, Öl oder Pellets', 'Heating with gas, oil or pellets', ['-']),
    kurzText: T('Abschlag, Heizgrenze, Tank, Wechsel', 'Advance payment, heating limit, tank, switching', ['abschlag', 'heizgrenze', 'tank', 'wechsel']),
    titel: T('Haus mit Gas, Öl oder Pellets', 'Home with gas, oil or pellets', ['-']),
    frage: T(
      '**Reicht der Abschlag, und wann ist der Tank leer?** Der Energietracker rechnet mit deinem Wetter, deinem Vertrag und deinen Lieferungen.',
      '**Is the advance payment enough, and when will the tank run dry?** Energietracker calculates with your weather, your contract and your deliveries.',
      ['abschlag', 'tank', 'heizgrenze']),
    punkte: [
      T('**Abschlag passend:** Saldo und erwartete Abrechnung zum Stichtag, dazu ein Vorschlag für den Abschlag.',
        '**The right advance payment:** balance and expected bill at the cut-off date, plus a suggested amount.',
        ['abschlag']),
      T('**Mehr verbraucht oder nur kälter?** Heizgradtage vom eigenen Standort, eine Heizgrenze je Zähler.',
        '**Used more, or just colder?** Degree days from your own location, a heating limit per meter.',
        ['heizgrenze']),
      T('**Rechnung prüfen,** bei Gas mit der Umrechnung von m³ in kWh nach Stichtagen.',
        '**Check a bill,** for gas with the m³ to kWh conversion by effective date.',
        ['rechnung-pruefen', 'gas-umrechnung']),
      T('**Tank leer am?** Das Tankbuch rechnet den Bestand aus Lieferungen und Peilständen, die Werkstatt den Tag zum Nachfüllen.',
        '**When is the tank empty?** The tank log calculates the stock from deliveries and dipstick readings, the workshop the day to refill.',
        ['tank']),
      T('**Wechseln oder tauschen?** Angebote nach den Kosten ab dem zweiten Jahr, und der Heizungstausch mit Wärmepumpe oder Pellets.',
        '**Switch or replace?** Offers by their cost from the second year, and replacing the heating with a heat pump or pellets.',
        ['wechsel', 'heizungstausch']),
    ],
    ehrlich: T(
      '**Annahmen statt Versprechen:** Jede Zahl eines Beispiels in der Werkstatt steht als angenommener Beispielwert da, kein Richtwert und kein Sparversprechen.',
      '**Assumptions, not promises:** every figure in a workshop example is shown as an assumed example value, not a benchmark and not a promise of savings.',
      ['werkstatt-annahmen']),
    links: [
      { href: (l) => demo(l, 'showcase', '/utility/gas'), text: T('Gas im Beispielhaushalt', 'Gas in the sample household', ['demo-routen']), haupt: true },
      { href: (l) => doc(l, 'anleitungen/jahresabrechnung.md'), text: T('Jahresabrechnung prüfen', 'Checking the annual bill', ['-']) },
      { href: (l) => doc(l, 'anleitungen/was-waere-wenn.md'), text: T('Die Werkstatt', 'The workshop', ['-']) },
    ],
    bilder: [
      { name: 'gas', alt: T(
        'Gas im Beispielhaushalt: Verbrauch, Kosten, Abschläge mit Saldo, Tagesschnitt und CO₂, darunter der Saldo am Tag der letzten Ablesung und das erwartete Guthaben.',
        'Gas in the sample household: consumption, cost, advance payments with balance, daily average and CO₂, below the balance on the day of the last reading and the expected credit.',
        ['saldo', 'abschlag']),
        text: T('Gemessen und geschätzt stehen getrennt. Beispielhaushalt, alle Zahlen erfunden.', 'Measured and estimated stand apart. Sample household, all figures invented.', ['saldo', 'bsp-erfunden']) },
      { name: 'heizoel-tank', alt: T(
        'Heizöl: Bestand im Tank als Balken und als Verlauf über das Jahr, berechnet aus Lieferungen und einem Peilstand.',
        'Heating oil: tank stock as a bar and as a curve over the year, calculated from deliveries and a dipstick reading.',
        ['tank']),
        text: T('Das Tankbuch rechnet Verbrauch und Bestand in einem.', 'The tank log calculates consumption and stock in one.', ['tank']) },
    ],
  },
  {
    id: 'miete', icon: 'schluessel',
    kurz: T('Zur Miete', 'Renting', ['-']),
    kurzText: T('Nebenkosten, CO₂-Kosten, Fristen', 'Service charges, CO₂ costs, deadlines', ['miete-vorauszahlung', 'co2', 'miete-fristen']),
    titel: T('Zur Miete', 'Renting', ['-']),
    frage: T(
      '**Reicht die Vorauszahlung, und stimmt die Nebenkostenabrechnung?** Du siehst deinen Verbrauch Monat für Monat, die App schätzt den laufenden Abrechnungszeitraum.',
      '**Is the prepayment enough, and is the service charge statement right?** You see your consumption month by month, and the app estimates the current billing period.',
      ['miete-vorauszahlung']),
    punkte: [
      T('**Passende Vorauszahlung je Monat,** gerechnet gegen die erwarteten Kosten. Eine Hilfsrechnung, keine Nebenkostenabrechnung.',
        '**A suitable prepayment per month,** set against the expected costs. An estimate, not a service charge statement.',
        ['miete-vorauszahlung']),
      T('**Heizung aus der Verbrauchsinfo:** Den Monatswert des Messdienstes trägst du als Heizwärme ein.',
        '**Heating from the consumption report:** you enter the metering service’s monthly figure as heat.',
        ['miete-heizwaerme']),
      T('**CO₂-Kosten teilen:** Bei eigener Gastherme rechnet die App den Anteil des Vermieters aus, bei Zentralheizung prüft sie die Abrechnung.',
        '**Sharing CO₂ costs:** with your own gas boiler the app works out the landlord’s share, with central heating it checks the statement.',
        ['co2']),
      T('**Fristen im Kalender** für die Abrechnung und deine Einwände, die Abrechnungen samt PDF an einem Ort.',
        '**Deadlines in your calendar** for the statement and your objections, the statements with their PDF in one place.',
        ['miete-fristen']),
    ],
    ehrlich: T(
      '**Nur für Deutschland:** Die CO₂-Aufteilung folgt dem CO2KostAufG. Sie ist eine Hilfsrechnung, keine Rechtsberatung.',
      '**Germany only:** the CO₂ split follows the German CO2KostAufG. It is an estimate, not legal advice.',
      ['co2-de']),
    links: [
      { href: (l) => demo(l, 'mieterin', '/tenancy'), text: T('Beispiel zur Miete', 'Renting example', ['demo-routen']), haupt: true },
      { href: (l) => doc(l, 'anleitungen/mieter.md'), text: T('Als Mieter', 'As a tenant', ['-']) },
      { href: (l) => doc(l, 'anleitungen/co2-aufteilung.md'), text: T('CO₂-Kosten teilen', 'Sharing CO₂ costs', ['-']) },
    ],
    bilder: [
      { name: 'miete', alt: T(
        'Mietverhältnis im Beispielhaushalt zur Miete: erwartete Kosten, vorausgezahlt, voraussichtlich ein kleines Guthaben, passende Vorauszahlung je Monat, darunter CO₂-Kosten teilen mit Stufe, Anteil des Vermieters und Erstattung.',
        'Tenancy in the renting sample household: expected costs, prepaid, a small credit likely, suitable prepayment per month, below sharing CO₂ costs with stage, landlord’s share and refund.',
        ['miete-vorauszahlung', 'co2']),
        text: T('Hilfsrechnung aus deinen Zählern. Beispielhaushalt, alle Zahlen erfunden.', 'An estimate from your meters. Sample household, all figures invented.', ['miete-vorauszahlung', 'bsp-erfunden']) },
    ],
  },
  {
    id: 'home-assistant', icon: 'stecker',
    kurz: T('Mit Home Assistant', 'With Home Assistant', ['-']),
    kurzText: T('App, Sensoren, Benachrichtigungen', 'App, sensors, notifications', ['ha-app', 'hacs', 'ha-notify']),
    titel: T('Mit Home Assistant', 'With Home Assistant', ['-']),
    frage: T(
      '**Home Assistant misst, der Energietracker rechnet ab.** Verträge, Abschläge und Prognosen kommen dazu, Home Assistant liefert still im Hintergrund die Stände.',
      '**Home Assistant measures, Energietracker settles the bill.** Contracts, advance payments and forecasts are added, while Home Assistant quietly delivers the readings.',
      ['ha-tagline']),
    punkte: [
      T('**Zählerstände kommen von selbst,** täglich oder je Viertelstunde, geschützt mit einem Schlüssel.',
        '**Readings arrive by themselves,** daily or per quarter hour, protected by a key.',
        ['ha-ingest']),
      T('**Als App in Home Assistant OS:** in der Seitenleiste, mit deinen Benutzern und in den Sicherungen von Home Assistant.',
        '**As an app in Home Assistant OS:** in the sidebar, with your users and in Home Assistant backups.',
        ['ha-app']),
      T('**Sensoren ohne eine Zeile YAML:** Zu tun, der nächste Termin und je Zähler Saldo, Verbrauch und Prognose, über die HACS-Integration.',
        '**Sensors without a line of YAML:** To do, the next appointment and per meter balance, consumption and forecast, through the HACS integration.',
        ['hacs']),
      T('**Fristen und neue Post** meldet der Energietracker selbst als Benachrichtigung an Home Assistant.',
        '**Deadlines and new mail** are sent by Energietracker itself as notifications to Home Assistant.',
        ['ha-notify']),
    ],
    ehrlich: T(
      '**Noch jung:** Die App für Home Assistant ist als experimentell markiert. Die HACS-Integration ist ein benutzerdefiniertes Repository, bis HACS sie in die Standardliste aufnimmt; das dauert laut HACS Monate.',
      '**Still young:** the Home Assistant app is marked experimental. The HACS integration is a custom repository until HACS adds it to the default list; according to HACS that takes months.',
      ['ha-experimentell', 'hacs-custom']),
    links: [
      { href: () => HA_ADD, text: T('App zu Home Assistant hinzufügen', 'Add the app to Home Assistant', ['install-ha']), haupt: true },
      { href: (l) => doc(l, 'anleitungen/home-assistant.md'), text: T('Home Assistant anbinden', 'Connecting Home Assistant', ['-']) },
      { href: () => REPO_HACS, text: T('HACS-Integration', 'HACS integration', ['hacs']) },
    ],
    bilder: [
      { name: 'wegweiser:home-assistant', alt: T(
        'Schaubild Mit Home Assistant: Smarte Zähler, Home Assistant liest sie aus und schickt Stände täglich oder je Viertelstunde an den Energietracker, zurück gehen Sensoren, Hinweise und Termine. evcc liefert Ladevorgänge. Außerhalb steht nur der Wetterdienst mit gerundetem Standort, abschaltbar.',
        'Diagram With Home Assistant: smart meters, Home Assistant reads them and sends readings daily or per quarter hour to Energietracker, sensors, hints and appointments go back. evcc delivers charging sessions. Outside there is only the weather service with a rounded location, which can be switched off.',
        ['ha-ingest', 'hacs', 'daten-aussen']),
        text: T('Aus dem Wegweiser der App: sechs Wege, mit dem Energietracker zu arbeiten.', 'From the app’s setup guide: six ways to work with Energietracker.', ['wegweiser']) },
      { name: 'verbindungen', alt: T(
        'Verbindungen: Daten holen mit Post und Fotos auslesen, Home Assistant, Wetterdaten und evcc, Daten geben mit Kalender, KI-Assistenten und Benachrichtigungen, je mit ihrem Stand.',
        'Connections: getting data with reading mail and photos, Home Assistant, weather data and evcc, giving data with calendar, AI assistants and notifications, each with its status.',
        ['verbindungen']),
        text: T('Alles ist freiwillig. Ohne eine einzige Verbindung läuft die App vollständig.', 'All of it is optional. The app runs fully without a single connection.', ['verbindungen']) },
    ],
  },
  {
    id: 'rechte', icon: 'waage',
    kurz: T('Deine Rechte als Kunde', 'Your rights as a customer', ['-']),
    kurzText: T('Fristen, Prüfungen, Briefe', 'Deadlines, checks, letters', ['rechte-sieben', 'rechte-fristen', 'briefe']),
    titel: T('Deine Rechte als Kunde', 'Your rights as a customer', ['-']),
    frage: T(
      '**Prüfen, verstehen, Rechte kennen.** Der Energietracker liest Verträge, Rechnungen und Abschläge mit einer zweiten Frage: Steht dir hier als Kunde etwas zu?',
      '**Check, understand, know your rights.** Energietracker reads contracts, bills and advance payments with a second question: are you entitled to something here as a customer?',
      ['rechte-frage']),
    punkte: [
      T('**Sieben Prüfungen nach deutschem Recht,** etwa Rechnung zu spät, Abschlag zu hoch, Sonderkündigung nach einer Preiserhöhung oder fehlender Bonus.',
        '**Seven checks under German law,** such as a late bill, an advance payment too high, special termination after a price increase or a missing bonus.',
        ['rechte-sieben']),
      T('**Jeder Hinweis nennt seine Quelle:** die Vorschrift mit Link und Stand.',
        '**Every note names its source:** the provision with a link and its date.',
        ['rechte-quelle']),
      T('**Fristen werden Termine,** 14 Tage vorher unter Zu tun und im Kalender.',
        '**Deadlines become appointments,** 14 days ahead under To do and in your calendar.',
        ['rechte-fristen']),
      T('**Der passende Brief** als Text und PDF, aus festen Bausteinen und deinen Daten, nie aus einem Sprachmodell. Abschicken tust du ihn selbst.',
        '**The matching letter** as text and PDF, from fixed templates and your data, never from a language model. You send it yourself.',
        ['briefe']),
    ],
    ehrlich: T(
      '**Ein Hinweis, keine Rechtsberatung.** Die App sagt, was das Gesetz vorsieht, nie, dass etwas rechtswidrig ist. Hilfe gibt es bei der Verbraucherzentrale und, bei Strom und Gas, bei der Schlichtungsstelle Energie.',
      '**A note, not legal advice.** The app says what the law provides, never that something is unlawful. Help is available from the consumer advice centre and, for electricity and gas, the energy arbitration board.',
      ['rechte-kein-rat']),
    links: [
      { href: (l) => demo(l, 'showcase', '/todo?art=rights'), text: T('Rechte im Beispielhaushalt', 'Rights in the sample household', ['demo-routen']), haupt: true },
      { href: (l) => doc(l, 'verstehen/17-rechte.md'), text: T('Deine Rechte als Kunde', 'Your rights as a customer', ['-']) },
      { href: (l) => doc(l, 'referenz/rechtsgrundlagen.md'), text: T('Rechtsgrundlagen', 'Legal basis', ['rechtsquellen']) },
    ],
    bilder: [
      { name: 'rechte', alt: T(
        'Zu tun mit dem Filter Rechte: ein Hinweis zur Sonderkündigung nach einer Preiserhöhung und einer zur Frist beim Gebührenbescheid, je mit Vorschrift, Quelle, Stand und dem Knopf Brief entwerfen.',
        'To do with the Rights filter: a note on special termination after a price increase and one on the deadline for a fee assessment, each with provision, source, date and the Draft a letter button.',
        ['rechte-quelle', 'briefe']),
        text: T('Jeder Hinweis mit Norm und Stand. Beispielhaushalt, alle Angaben erfunden.', 'Every note with its norm and date. Sample household, all details invented.', ['rechte-quelle', 'bsp-erfunden']) },
      { name: 'brief', alt: T(
        'Dialog Brief entwerfen, Sonderkündigung: Kundennummer, Vertragsnummer, Zählernummer und Lieferanschrift aus Haushalt und Vertrag, darunter die Vorschau des Briefs und die Knöpfe Text kopieren und PDF herunterladen.',
        'Dialog Draft a letter, special termination: customer number, contract number, meter number and supply address from household and contract, below the preview of the letter and the buttons Copy text and Download PDF.',
        ['briefe']),
        text: T('Der Brief füllt sich aus deinen Daten; abschicken tust du ihn selbst.', 'The letter fills itself from your data; you send it yourself.', ['briefe']) },
    ],
  },
  {
    id: 'ki', icon: 'ki',
    kurz: T('Mit deiner eigenen KI', 'With your own AI', ['-']),
    kurzText: T('Fragen statt suchen, im Heimnetz', 'Ask instead of searching, at home', ['ki-frage', 'ki-lokal']),
    titel: T('Mit deiner eigenen KI', 'With your own AI', ['-']),
    frage: T(
      '**Frag deine KI, wie es um Strom und Gas steht.** Die KI ist die Oberfläche, der Energietracker die Akte dahinter: Er rechnet, die KI erzählt.',
      '**Ask your AI how electricity and gas are doing.** The AI is the interface, Energietracker the file behind it: it calculates, the AI tells.',
      ['ki-frage', 'ki-akte']),
    punkte: [
      T('**20 Werkzeuge über MCP,** mit denselben Zahlen wie in der App: Saldo, Verbrauch, Verträge, Fristen, Prognose.',
        '**20 tools over MCP,** with the same figures as in the app: balance, consumption, contracts, deadlines, forecast.',
        ['ki-werkzeuge']),
      T('**Jede Zahl mit Herkunft:** gemessen, verteilt, angenommen oder geschätzt, Geschätztes mit Spanne.',
        '**Every figure with its basis:** measured, distributed, assumed or estimated, estimates with a range.',
        ['ki-herkunft']),
      T('**Sie ändert nichts ohne dich:** Die KI schlägt vor, ab Werk bestätigst du in der App.',
        '**It changes nothing without you:** the AI proposes, by default you confirm in the app.',
        ['ki-vorschlag']),
      T('**Ab Werk aus,** mit eigenem Schlüssel je Programm und jedem Zugriff im Protokoll. Kennnummern gibt es nur mit eigenem Schalter.',
        '**Off by default,** with a key of its own per program and every access logged. Identifiers only with their own switch.',
        ['ki-aus', 'ki-schutz']),
      T('**Lokal bleibt es im Haus,** mit Open WebUI und einem Modell über Ollama.',
        '**Local stays at home,** with Open WebUI and a model through Ollama.',
        ['ki-lokal']),
    ],
    ehrlich: T(
      '**Geprüft mit Open WebUI und einem lokalen Modell über Ollama.** Andere Programme und Cloud-Modelle sind experimentell. Die öffentliche Demo zeigt die Seite, hat aber keine KI-Schnittstelle.',
      '**Tested with Open WebUI and a local model through Ollama.** Other programs and cloud models are experimental. The public demo shows the page but has no AI interface.',
      ['ki-geprueft', 'demo-ohne-ki']),
    links: [
      { href: (l) => demo(l, 'showcase', '/connections/ai?mcp=value'), text: T('KI-Seite in der Demo', 'AI page in the demo', ['demo-routen']), haupt: true },
      { href: (l) => doc(l, 'anleitungen/ki-assistent.md'), text: T('KI-Assistent anbinden', 'Connecting an AI assistant', ['-']) },
      { href: (l) => doc(l, 'verstehen/18-herkunft.md'), text: T('Woher eine Zahl kommt', 'Where a figure comes from', ['ki-herkunft']) },
    ],
    bilder: [
      { name: 'wegweiser:local-ai', alt: T(
        'Schaubild Mit KI lokal: Du fragst Open WebUI, Open WebUI fragt den Energietracker über MCP mit Schlüssel und bekommt Zahlen mit Herkunft, Ollama läuft als Sprachmodell auf deinem Rechner. Eine Änderung bestätigst du in der App. Außerhalb stehen nur der Modell-Download beim Einrichten und der Wetterdienst.',
        'Diagram With local AI: you ask Open WebUI, Open WebUI asks Energietracker over MCP with a key and gets figures with their basis, Ollama runs as the language model on your computer. You confirm a change in the app. Outside there are only the model download during setup and the weather service.',
        ['ki-akte', 'ki-vorschlag', 'ki-lokal']),
        text: T('Aus dem Wegweiser der App.', 'From the app’s setup guide.', ['wegweiser']) },
      { name: 'ki', alt: T(
        'Verbindungen, KI-Assistenten: ausgeschaltet, keine KI kann zugreifen; der Schalter Übernahme nur in der App bestätigen ist an.',
        'Connections, AI assistants: switched off, no AI can get access; the switch Confirm changes in the app only is on.',
        ['ki-aus', 'ki-vorschlag']),
        text: T('Ab Werk aus, und eine Änderung bestätigst du selbst.', 'Off by default, and you confirm a change yourself.', ['ki-aus', 'ki-vorschlag']) },
    ],
  },
];

export const ALLE = {
  h2: T('In jedem Haushalt', 'In every household', ['-']),
  lead: T('**Was alle Wege gemeinsam haben.**', '**What every path has in common.**', ['-']),
  liste: [
    { icon: 'eingang', text: T(
      '**Post ablegen statt abtippen.** PDF in den Posteingang, eine KI im Heimnetz liest es aus, jede Zahl steht mit ihrer Stelle im Dokument da.',
      '**File supplier mail instead of typing it.** Drop the PDF into the inbox, an AI in your home network reads it, every figure shows its place in the document.',
      ['posteingang']) },
    { icon: 'aufgaben', text: T(
      '**Zu tun sammelt alles Offene:** Fristen, Termine, Empfehlungen, Rechte und Post in einer Liste, als Abo auch im eigenen Kalender.',
      '**To do gathers everything open:** deadlines, appointments, recommendations, rights and mail in one list, also as a subscription in your own calendar.',
      ['zutun', 'kalender']) },
    { icon: 'dokument', text: T(
      '**Jahresbericht als PDF,** für Leser ohne Technikhintergrund: das Wichtigste vorn, je Verbrauchsart eine Seite.',
      '**Annual report as a PDF,** for readers without a technical background: the essentials first, one page per utility.',
      ['jahresbericht']) },
    { icon: 'kolben', text: T(
      '**Was kostet ein kalter Winter?** Die Werkstatt rechnet Winter, Dämmung, Raumtemperatur und Tarif mit deinen Daten durch.',
      '**What does a cold winter cost?** The workshop runs winter, insulation, room temperature and tariff through your own data.',
      ['werkstatt']) },
    { icon: 'menue', text: T(
      '**Am Handy:** eine Leiste mit Übersicht, Zu tun, Erfassen, Verbrauch und Mehr, als App auf dem Home-Bildschirm.',
      '**On your phone:** a bar with Overview, To do, Capture, Consumption and More, as an app on the home screen.',
      ['handy']) },
    { icon: 'schaubild', text: T(
      '**Ein Wegweiser mit sechs Wegen:** von Hand, mit Versorgerpost, mit Home Assistant, mit KI lokal, mit KI in der Cloud (experimentell) und alles zusammen.',
      '**A setup guide with six ways:** by hand, with supplier mail, with Home Assistant, with local AI, with cloud AI (experimental) and all together.',
      ['wegweiser']) },
  ],
};

export const VERTRAUEN = {
  h2: T('Warum du dem Energietracker trauen kannst', 'Why you can trust Energietracker', ['-']),
  lead: T(
    '**Du musst nichts glauben, du kannst alles nachprüfen.** Hier steht, was die App tut, was sie nicht tut und wo es belegt ist.',
    '**You do not have to believe anything, you can check it all.** Here is what the app does, what it does not do and where that is documented.',
    ['-']),
  bildAlt: T(
    'Schaubild Dein Zuhause: Home Assistant, Versorgerpost, eine KI im Haus und du sprechen mit dem Energietracker. Außerhalb stehen nur ein Cloud-Dienst, experimentell und nur wenn ausdrücklich eingeschaltet, und der Wetterdienst mit gerundetem Standort, abschaltbar.',
    'Diagram Your home: Home Assistant, supplier mail, an AI at home and you talk to Energietracker. Outside there are only a cloud service, experimental and only when expressly switched on, and the weather service with a rounded location, which can be switched off.',
    ['daten-aussen']),
  bildText: T(
    '**Was ins Haus gehört, bleibt drin.** Hinaus geht ab Werk nur der Wetterabgleich, abschaltbar. Alles andere schaltest du selbst ein.',
    '**What belongs at home stays there.** By default only the weather sync goes out, and it can be switched off. Everything else you switch on yourself.',
    ['daten-aussen']),
  belege: [
    { icon: 'schloss', text: T(
      '**Deine Daten bleiben bei dir.** Keine Konten, keine Werbung, keine Telemetrie, keine Datenbank, nur JSON-Dateien auf deinem Server.',
      '**Your data stays with you.** No accounts, no ads, no telemetry, no database, just JSON files on your server.',
      ['daten-bleiben']),
      beleg: { href: (l) => datei(l, 'README.de.md#deine-daten', 'README.md#your-data'), text: T('README, Deine Daten', 'README, Your data', ['-']) } },
    { icon: 'buch', text: T(
      '**Offener Code unter AGPL.** Zu Hause gehört er dir. Unter Einstellungen › System führt ein Link zum Quellcode genau der laufenden Version.',
      '**Open source under the AGPL.** At home it is yours. Under Settings › System a link leads to the source code of exactly the running version.',
      ['agpl', 'quellcode-laufend']),
      beleg: { href: () => `${REPO}/blob/main/LICENSE`, text: T('Lizenz', 'Licence', ['-']) } },
    { icon: 'schild', text: T(
      '**Signierte Images.** Seit 3.10.0 ist jedes Image signiert, ohne Schlüssel und im öffentlichen Transparenzprotokoll, dazu mit Stückliste und Herkunftsnachweis.',
      '**Signed images.** Since 3.10.0 every image is signed, keyless and in the public transparency log, and carries a bill of materials and provenance.',
      ['signiert', 'sbom']),
      beleg: { href: () => `${REPO}/blob/main/SECURITY.md`, text: T('Das Image prüfen', 'Checking the image', ['-']) } },
    { icon: 'puls', text: T(
      '**Sicherheit mit Fristen.** Jeden Dienstag wird das neueste Release neu gebaut und auf bekannte Lücken geprüft. Lücken meldest du vertraulich, die Bestätigung kommt binnen 7 Tagen.',
      '**Security with deadlines.** Every Tuesday the latest release is rebuilt and scanned for known vulnerabilities. You report issues confidentially and get an acknowledgement within 7 days.',
      ['neubau', 'security-melden']),
      beleg: { href: () => `${REPO}/blob/main/SECURITY.md`, text: T('Sicherheitsrichtlinie', 'Security policy', ['-']) } },
    { icon: 'waage', text: T(
      '**Rechtsquellen mit Stand.** Jede Vorschrift mit Link, dem Tag, an dem sie gelesen wurde, und wie sicher die Aussage ist. Unsichere Regeln nennt die App nie, ein Test hält Seite und Code gleich.',
      '**Legal sources with a date.** Every provision with a link, the day it was read and how certain the statement is. The app never states uncertain rules, and a test keeps the page and the code in step.',
      ['rechtsquellen']),
      beleg: { href: (l) => doc(l, 'referenz/rechtsgrundlagen.md'), text: T('Rechtsgrundlagen', 'Legal basis', ['-']) } },
    { icon: 'erfolg', text: T(
      '**2.667 Testmethoden in 3.12.0.** Jede neue Regel hat eine Gegenprobe, die sie bricht. Rechenwege sind von Hand nachgerechnet, jede Zahl im README hängt an einem Test.',
      '**2,667 test methods in 3.12.0.** Every new rule has a counter-test that breaks it. Calculations are checked by hand, and every figure in the README is tied to a test.',
      ['tests']),
      beleg: { href: (l) => datei(l, 'CHANGELOG.md', 'CHANGELOG.en.md'), text: T('CHANGELOG, Tests', 'CHANGELOG, Tests', ['-']) } },
    { icon: 'zahnrad', text: T(
      '**Verlässliche Schnittstellen.** API, CSV-Formate und Backup-Format ändern sich nur additiv. Entfernt wird erst mit einer neuen Hauptversion und nach Ankündigung.',
      '**Dependable interfaces.** APIs, CSV formats and the backup format change only additively. Anything is removed only with a new major version and after notice.',
      ['stabil']),
      beleg: { href: (l) => datei(l, 'README.de.md#stand', 'README.md#status'), text: T('README, Stand', 'README, Status', ['-']) } },
    { icon: 'kalender', text: T(
      '**Offene Roadmap mit Takt.** Ein Release hat ein Thema und erscheint, wenn es fertig und geprüft ist, in der Regel nach ein bis drei Wochen.',
      '**An open roadmap with a rhythm.** A release has one theme and comes out when it is done and tested, usually after one to three weeks.',
      ['roadmap-takt']),
      beleg: { href: (l) => datei(l, 'roadmap.md', 'roadmap.en.md'), text: T('Roadmap', 'Roadmap', ['-']) } },
    { icon: 'idee', text: T(
      '**Wünsche werden bewertet.** Vor jedem Release zählen Nutzen für viele, Nähe zur Rechnung, Aufwand und Datenschutz. Angenommene Ideen bekommen einen Milestone, abgelehnte eine Begründung.',
      '**Ideas are assessed.** Before each release what counts is benefit for many, closeness to the bill, effort and privacy. Accepted ideas get a milestone, declined ones a reason.',
      ['ideen-bewertet']),
      beleg: { href: (l) => datei(l, 'roadmap.md#wünsche-und-fehler-melden', 'roadmap.en.md#suggest-ideas-report-bugs'), text: T('Roadmap, Wünsche', 'Roadmap, Ideas', ['-']) } },
    { icon: 'info', text: T(
      '**Grenzen stehen dabei.** Seit 3.7.0 nennt jedes Release im CHANGELOG unter „Bekannte Grenzen“, was es noch nicht kann. Die Roadmap sagt, was bewusst nicht geplant ist.',
      '**Limits are stated.** Since 3.7.0 every release lists under “Known limits” in the CHANGELOG what it cannot do yet. The roadmap says what is deliberately not planned.',
      ['grenzen-changelog']),
      beleg: { href: (l) => datei(l, 'CHANGELOG.md', 'CHANGELOG.en.md'), text: T('Bekannte Grenzen', 'Known limits', ['-']) } },
  ],
  aussenH3: T('Was das Haus verlässt', 'What leaves your home', ['-']),
  aussenKopf: [T('Verbindung', 'Connection', ['-']), T('Ab Werk', 'By default', ['-']), T('Was hinausgeht', 'What goes out', ['-'])],
  aussen: [
    [T('Wetterabgleich mit Open-Meteo', 'Weather sync with Open-Meteo', ['aussen-wetter']), T('an, abschaltbar', 'on, can be switched off', ['aussen-wetter']), T('der Standort, auf rund 1 km gerundet, einmal am Tag', 'your location rounded to about 1 km, once a day', ['aussen-wetter'])],
    [T('Ortssuche bei Open-Meteo', 'Place search at Open-Meteo', ['aussen-ort']), T('nur, wenn du sie benutzt', 'only when you use it', ['aussen-ort']), T('der Ort, den du suchst', 'the place you search for', ['aussen-ort'])],
    [T('Hinweis auf neue Versionen', 'Note about new versions', ['aussen-version']), T('aus, du schaltest ihn ein', 'off, you switch it on', ['aussen-version']), T('einmal am Tag die Frage an GitHub nach der neuesten Versionsnummer', 'once a day GitHub is asked for the newest version number', ['aussen-version'])],
    [T('Börsenstrompreise von SMARD', 'Wholesale prices from SMARD', ['aussen-smard']), T('nur auf Knopfdruck', 'only when you tap', ['aussen-smard']), T('nichts von dir', 'nothing of yours', ['aussen-smard'])],
    [T('Texterkennung, evcc, Home Assistant', 'Text recognition, evcc, Home Assistant', ['aussen-heimnetz']), T('nur, wenn du sie einträgst', 'only when you set them up', ['aussen-heimnetz']), T('nur an deine eigenen Dienste im Heimnetz', 'only to your own services in your home network', ['aussen-heimnetz'])],
    [T('Auslesen in der Cloud, experimentell', 'Reading in the cloud, experimental', ['aussen-cloud']), T('aus, nur ein Verwalter schaltet es ein', 'off, only an administrator switches it on', ['aussen-cloud']), T('Dokumente an den gewählten Dienst', 'documents to the chosen service', ['aussen-cloud'])],
    [T('KI-Schnittstelle (MCP)', 'AI interface (MCP)', ['mcp-aus']), T('aus', 'off', ['mcp-aus']), T('nur Antworten auf Anfragen mit eigenem Schlüssel', 'only answers to requests with a key of its own', ['mcp-aus'])],
  ],
  aussenNote: T(
    'Schriften, Chart.js und PDF.js liegen im Repository, zur Laufzeit kommt nichts von einem CDN.',
    'Fonts, Chart.js and PDF.js ship with the repository, nothing is loaded from a CDN at runtime.',
    ['vendored']),
  grenzenH3: T('Was der Energietracker noch nicht kann', 'What Energietracker cannot do yet', ['-']),
  grenzen: [
    T('**Prognose nach dem Wetter für Wärmepumpe, PV und Speicher:** kommt mit v3.13, geplant für den 17.11.2026.',
      '**Weather-based forecast for heat pump, PV and battery:** comes with v3.13, planned for 17 Nov 2026.',
      ['grenze-wp-wetter']),
    T('**KI:** geprüft nur mit Open WebUI und Ollama. Ob ein anderes Programm vor einer Übernahme nachfragt, ist nicht geprüft; deshalb bestätigst du ab Werk in der App.',
      '**AI:** tested only with Open WebUI and Ollama. Whether another program asks before applying a change is not tested; that is why by default you confirm in the app.',
      ['ki-geprueft', 'grenze-ki-nachfrage']),
    T('**Rechte nur nach deutschem Recht.** In anderen Ländern zeigt die App keine Hinweise zu Rechten.',
      '**Rights under German law only.** In other countries the app shows no notes on rights.',
      ['rechte-nur-de']),
    T('**Fachlich in Deutschland zu Hause:** Für acht weitere Länder setzen Länderprofile Währung, Formate und Wetter. Effizienzklassen gibt es dort nicht, Währungen rechnet die App nicht um.',
      '**At home in Germany in substance:** for eight more countries, profiles set currency, formats and weather. There are no efficiency classes there, and the app does not convert currencies.',
      ['laender']),
    T('**Home Assistant:** Die App ist experimentell, die HACS-Integration vorerst ein benutzerdefiniertes Repository.',
      '**Home Assistant:** the app is experimental, the HACS integration a custom repository for now.',
      ['ha-experimentell', 'hacs-custom']),
    T('**iPhone und iPad** sind im Testbrowser mit WebKit geprüft, nicht auf einem echten Gerät.',
      '**iPhone and iPad** are tested in the WebKit test browser, not on a real device.',
      ['grenze-iphone']),
    T('**Rechtsgrundlagen:** Vor jedem Release liest ein Mensch jede Zeile gegen den geltenden Wortlaut. Für v3.11.0 steht das laut der Seite selbst noch aus.',
      '**Legal basis:** before each release a person reads every line against the wording in force. For v3.11.0 that is still pending, as the page itself says.',
      ['grenze-gegenlesen']),
  ],
  grenzenLink: { href: (l) => datei(l, 'CHANGELOG.md', 'CHANGELOG.en.md'), text: T('Alle bekannten Grenzen im CHANGELOG', 'All known limits in the CHANGELOG', ['grenzen-changelog']) },
};

export const INSTALL = {
  h2: T('In drei Schritten installiert', 'Installed in three steps', ['-']),
  lead: T(
    '**Wähle den Weg, der zu deinem Zuhause passt.** Überall läuft dasselbe Programm. Das Image gibt es für amd64 und arm64.',
    '**Pick the way that fits your home.** The same program runs everywhere. The image is built for amd64 and arm64.',
    ['image-gleich', 'multiarch']),
  wege: [
    {
      icon: 'bausteine', titel: T('Docker', 'Docker', ['-']),
      fuer: T('auf dem Rechner, dem NAS oder dem Server', 'on your computer, NAS or server', ['install-docker']),
      schritte: [
        T('Container starten:', 'Start the container:', ['install-docker']),
        T('`http://localhost:8080` öffnen.', 'Open `http://localhost:8080`.', ['install-docker']),
        T('**„Mit Beispieldaten ausprobieren“** zeigt sofort, wie alles aussieht; eigene Daten gehen dabei nicht verloren.',
          '**“Try with sample data”** shows right away what everything looks like; your own data is not lost.',
          ['install-docker']),
      ],
      code: { nach: 0, text: 'docker run -d --name energietracker \\\n  --restart unless-stopped -p 8080:80 \\\n  -v energietracker-data:/data \\\n  ghcr.io/bingerminger/energietracker:3' },
      link: { href: (l) => doc(l, 'betrieb/docker.md'), text: T('Docker-Betrieb', 'Running with Docker', ['-']) },
    },
    {
      icon: 'home', titel: T('Home Assistant OS', 'Home Assistant OS', ['-']),
      fuer: T('als App mit Eintrag in der Seitenleiste', 'as an app with an entry in the sidebar', ['ha-app']),
      schritte: [
        T('[Repository mit einem Klick hinzufügen](' + HA_ADD + ') oder unter Einstellungen › Apps › ⋮ › Repositories die Adresse eintragen:',
          '[Add the repository with one click](' + HA_ADD + ') or enter the address under Settings › Apps › ⋮ › Repositories:',
          ['install-ha']),
        T('**Energietracker** installieren und starten.', 'Install and start **Energietracker**.', ['install-ha']),
        T('In der Seitenleiste öffnen. Wer ihn zuerst öffnet, verwaltet die Installation.',
          'Open it in the sidebar. The first person to open it administers the installation.',
          ['install-ha']),
      ],
      code: { nach: 0, text: 'https://github.com/Bingerminger/energietracker-ha' },
      note: T('**Sensoren dazu:** die [HACS-Integration](' + HACS_OPEN + ') als benutzerdefiniertes Repository, Typ Integration.',
        '**Sensors as well:** the [HACS integration](' + HACS_OPEN + ') as a custom repository, type Integration.',
        ['install-hacs']),
      link: { href: (l) => doc(l, 'anleitungen/home-assistant.md', l === 'en' ? '#as-an-app-in-home-assistant-os' : '#als-app-in-home-assistant-os'), text: T('Als App in Home Assistant OS', 'As an app in Home Assistant OS', ['-']) },
    },
    {
      icon: 'block', titel: T('NAS und Heimserver', 'NAS and home server', ['-']),
      fuer: T('Synology, Unraid, CasaOS oder Umbrel', 'Synology, Unraid, CasaOS or Umbrel', ['nas-vorlagen']),
      schritte: [
        T('Synology: im Container Manager unter Projekt › Erstellen einen Ordner wählen und die `docker-compose.yml` aus der Anleitung einfügen.',
          'Synology: in Container Manager under Project › Create, choose a folder and paste the `docker-compose.yml` from the guide.',
          ['install-nas']),
        T('Das Projekt starten.', 'Start the project.', ['install-nas']),
        T('`http://<NAS-Adresse>:8080` öffnen.', 'Open `http://<NAS address>:8080`.', ['install-nas']),
      ],
      note: T('Für Unraid, CasaOS und Umbrel liegen Vorlagen bei. Die Vorlage für Unraid ist gegen Format und Image geprüft, auf einem echten Unraid-Server aber nicht ausprobiert.',
        'Templates for Unraid, CasaOS and Umbrel are included. The Unraid template is checked against the format and the image, but not tried on a real Unraid server.',
        ['nas-vorlagen']),
      link: { href: (l) => doc(l, 'betrieb/docker.md', '#synology-container-manager'), text: T('Synology, Unraid, CasaOS, Umbrel', 'Synology, Unraid, CasaOS, Umbrel', ['-']) },
    },
    {
      icon: 'globus', titel: T('Eigener Webserver', 'Your own web server', ['-']),
      fuer: T('Apache oder nginx mit PHP ab 8.2, ohne Composer', 'Apache or nginx with PHP 8.2 or later, no Composer', ['install-web']),
      schritte: [
        T('Den Code auf den Server holen, etwa mit `git clone`.', 'Get the code onto the server, for example with `git clone`.', ['install-web']),
        T('Apache mit der mitgelieferten `.htaccess` oder nginx mit den Regeln aus `docker/nginx.conf` einrichten.',
          'Set up Apache with the included `.htaccess` or nginx with the rules from `docker/nginx.conf`.',
          ['install-web']),
        T('Dem Webserver Schreibrecht auf `data/` geben und die Adresse öffnen.', 'Give the web server write access to `data/` and open the address.', ['install-web']),
      ],
      link: { href: (l) => doc(l, 'betrieb/webserver.md'), text: T('Apache und nginx', 'Apache and nginx', ['-']) },
    },
  ],
  achtung: T(
    '**Ohne Anmeldung kann jeder, der die App erreicht, alles lesen und ändern.** Im eigenen Heimnetz ist das in Ordnung. Vor dem Zugriff von außen die Anmeldung einschalten.',
    '**Without sign-in, anyone who can reach the app can read and change everything.** On your own home network that is fine. Before allowing access from outside, switch sign-in on.',
    ['anmeldung']),
  achtungLink: { href: (l) => doc(l, 'betrieb/sicherheit.md'), text: T('Sicherheit und Netzbetrieb', 'Security and network operation', ['-']) },
};

export const VORHABEN = {
  h2: T('Ein Vorhaben, drei Repositories', 'One project, three repositories', ['-']),
  lead: T(
    '**Alles ist öffentlich: Code, Handbuch, Roadmap und jede Änderung.**',
    '**Everything is public: code, handbook, roadmap and every change.**',
    ['offen']),
  repos: [
    { icon: 'home', name: T('Energietracker', 'Energietracker', ['-']), slug: 'Bingerminger/energietracker', href: REPO,
      text: T('Die App selbst, mit Handbuch auf Deutsch und Englisch, Roadmap und CHANGELOG. Lizenz AGPL-3.0-or-later.',
        'The app itself, with a handbook in German and English, roadmap and CHANGELOG. Licence AGPL-3.0-or-later.',
        ['repo-main', 'agpl']) },
    { icon: 'stecker', name: T('App für Home Assistant', 'Home Assistant app', ['-']), slug: 'Bingerminger/energietracker-ha', href: REPO_HA,
      text: T('Bringt den Energietracker als App in Home Assistant OS, mit demselben Image wie Docker. Ihre Version ist die des Energietrackers.',
        'Brings Energietracker to Home Assistant OS as an app, with the same image as Docker. Its version is the Energietracker version.',
        ['repo-ha']) },
    { icon: 'bausteine', name: T('HACS-Integration', 'HACS integration', ['-']), slug: 'Bingerminger/energietracker-hacs', href: REPO_HACS,
      text: T('Sensoren in Home Assistant ohne YAML. Sie liest nur die stabilen Schnittstellen, ein neues Release des Energietrackers braucht kein neues der Integration.',
        'Sensors in Home Assistant without YAML. It reads only the stable interfaces, so a new Energietracker release needs no new integration release.',
        ['repo-hacs']) },
  ],
  linksH3: T('Zum Nachlesen', 'To read on', ['-']),
  links: [
    { href: (l) => demo(l), text: T('Demo im Browser', 'Demo in the browser', ['-']) },
    { href: (l) => doc(l, 'README.md'), text: T('Handbuch', 'Handbook', ['-']) },
    { href: () => `${REPO}/releases`, text: T('Releases', 'Releases', ['-']) },
    { href: (l) => datei(l, 'roadmap.md', 'roadmap.en.md'), text: T('Roadmap', 'Roadmap', ['-']) },
    { href: (l) => datei(l, 'CHANGELOG.md', 'CHANGELOG.en.md'), text: T('CHANGELOG', 'CHANGELOG', ['-']) },
    { href: () => `${REPO}/discussions`, text: T('Discussions', 'Discussions', ['-']) },
  ],
};

export const MITMACHEN = {
  h2: T('Mitmachen und unterstützen', 'Get involved and support', ['-']),
  lead: T(
    '**Der Energietracker ist unabhängig: keine Firma dahinter, keine Werbung, kein Cloud-Konto.** Er wird in der Freizeit gepflegt.',
    '**Energietracker is independent: no company behind it, no advertising, no cloud account.** It is maintained in spare time.',
    ['unabhaengig', 'freizeit']),
  liste: [
    { icon: 'stern', href: () => REPO, text: T(
      '**Ein Stern auf GitHub** hilft, genauso wie Fehlermeldungen und Weitersagen.',
      '**A star on GitHub** helps, just like bug reports and telling others.',
      ['stern']), linkText: T('Zum Projekt auf GitHub', 'To the project on GitHub', ['-']) },
    { icon: 'idee', href: () => `${REPO}/discussions/categories/ideas`, text: T(
      '**Ideen einreichen** unter Discussions › Ideas. Gib bestehenden Ideen ein Daumen hoch, so zeigt sich, was vielen wichtig ist.',
      '**Suggest ideas** under Discussions › Ideas. Give existing ideas a thumbs up, so it shows what matters to many.',
      ['ideen']), linkText: T('Ideas', 'Ideas', ['-']) },
    { icon: 'achtung', href: () => `${REPO}/issues/new/choose`, text: T(
      '**Fehler melden** als Issue, am besten mit Version, Schritten und einem erfundenen Beispiel statt echter Rechnungen.',
      '**Report bugs** as an issue, ideally with version, steps and an invented example instead of real bills.',
      ['fehler-melden']), linkText: T('Issue anlegen', 'Open an issue', ['-']) },
    { icon: 'schild', href: () => `${REPO}/security/advisories/new`, text: T(
      '**Sicherheitslücken** bitte nicht öffentlich, sondern vertraulich über GitHub melden.',
      '**Security issues** please not in public, report them confidentially through GitHub.',
      ['security-melden']), linkText: T('Vertraulich melden', 'Report confidentially', ['-']) },
    { icon: 'globus', href: (l) => datei(l, 'CONTRIBUTING.de.md', 'CONTRIBUTING.md'), text: T(
      '**Übersetzen und mitentwickeln:** Pull Requests sind willkommen. Eine neue Sprache ist vor allem Übersetzung.',
      '**Translate and contribute:** pull requests are welcome. A new language is mostly translation.',
      ['mitwirken']), linkText: T('Mitwirken', 'Contributing', ['-']) },
    { icon: 'herz', href: () => KAFFEE, text: T(
      '**Unterstützen, ganz freiwillig:** Wenn dir der Energietracker hilft und du etwas zurückgeben möchtest, kannst du einen Kaffee spendieren.',
      '**Support, entirely voluntary:** if Energietracker helps you and you want to give something back, you can buy a coffee.',
      ['unterstuetzen']), linkText: T('buymeacoffee.com/bingerminger', 'buymeacoffee.com/bingerminger', ['-']) },
  ],
};

export const FUSS = {
  lizenz: T(
    'Der Energietracker ist ein unabhängiges Projekt unter der GNU AGPL v3.0 oder neuer.',
    'Energietracker is an independent project under the GNU AGPL v3.0 or later.',
    ['agpl', 'unabhaengig']),
  seite: T(
    '**Diese Seite lädt nichts von fremden Servern, setzt keine Cookies und zählt keine Besuche.** Im Browser merkt sie sich nur, ob du den Hinweis zur Sprache geschlossen hast. Ausgeliefert wird sie von GitHub Pages.',
    '**This page loads nothing from other servers, sets no cookies and counts no visits.** In your browser it only remembers whether you closed the language note. It is served by GitHub Pages.',
    ['seite-selbst']),
  marken: T(
    'Produktnamen wie Home Assistant, HACS, Open WebUI, Ollama, Docker und Synology stehen hier nur, um Funktionen und Installationswege zu beschreiben. Eine Verbindung zu ihren Inhabern besteht nicht.',
    'Product names such as Home Assistant, HACS, Open WebUI, Ollama, Docker and Synology appear here only to describe features and installation paths. There is no connection to their owners.',
    ['marken']),
  schrift: T('Schrift: DM Sans und DM Mono, SIL Open Font License 1.1.', 'Typeface: DM Sans and DM Mono, SIL Open Font License 1.1.', ['schrift']),
  marke: T('Markenhinweise', 'Trademark notices', ['-']),
  lizenzLink: T('Lizenz', 'Licence', ['-']),
};
