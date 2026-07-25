# KI-Wissensmanagement Dashboard

Ein leichtgewichtiges, rein clientseitiges Dashboard mit aktuellen Neuigkeiten
rund um **KI-gestütztes Wissensmanagement für Unternehmen**: Trends, Tools &
Software, Studien & Berichte, Governance & Compliance sowie Praxisbeispiele
aus Unternehmen.

## Nutzung

Keine Installation nötig – einfach `index.html` im Browser öffnen, oder für
volle Live-Aktualisierung lokal ausliefern:

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

Das Dashboard lässt sich unverändert z. B. via GitHub Pages hosten (Settings →
Pages → Branch auswählen → Root-Verzeichnis).

## Funktionen

- **Kuratierte Startbeiträge**: 12 aktuell recherchierte Artikel sind direkt
  in `assets/app.js` hinterlegt, damit beim ersten Laden sofort relevante
  Inhalte sichtbar sind.
- **Live-Nachladen**: Beim Öffnen und über den „Aktualisieren“-Button ruft das
  Dashboard zusätzlich aktuelle Google-News-RSS-Ergebnisse zu fünf Suchen ab
  (je eine pro Kategorie) – direkt im Browser der Nutzerin/des Nutzers, ohne
  eigenen Server. Da Google News RSS keine CORS-Header sendet, läuft der
  Abruf über einen öffentlichen CORS-Proxy (mit Fallback auf einen zweiten
  Proxy). Ergebnisse werden 30 Minuten im `localStorage` zwischengespeichert.
- **Fallback**: Schlägt der Live-Abruf fehl (z. B. weil Proxy/Netzwerk nicht
  erreichbar sind), zeigt das Dashboard automatisch die kuratierten
  Startdaten bzw. den letzten erfolgreichen Cache-Stand. Der Status wird oben
  rechts angezeigt („Live-Daten aktiv“ / „Nur kuratierte Startdaten“).
- **Filter & Suche**: Volltextsuche, Kategorie-Chips, Quellen-Filter und
  Sortierung (neueste/älteste/alphabetisch).
- **Hell/Dunkel-Modus**: folgt automatisch den Systemeinstellungen, lässt sich
  über den Button oben rechts manuell umschalten und wird gemerkt.
- **X-Posts von KI-Größen** (Boris Cherny, Andrej Karpathy, Sam Altman, Yann
  LeCun, Demis Hassabis): eingebettete, offizielle X-Timelines ohne API-Key
  über `platform.twitter.com/widgets.js`. Standardmäßig **deaktiviert** (Opt-in
  über den Button „X-Feeds laden & anzeigen“), da beim Laden ein Skript von X
  nachgeladen wird und dabei Cookies/Tracking-Requests an X gehen können.
  Zeigt jeweils alle öffentlichen Posts der Person, nicht themengefiltert.

## Anpassen

- **Kuratierte Artikel** ändern/ergänzen: Array `SEED_ARTICLES` in
  `assets/app.js`.
- **Live-Suchanfragen** anpassen: Array `LIVE_QUERIES` in `assets/app.js`
  (Suchbegriff, Sprache/Land pro Kategorie).
- **X-Personen** ändern/ergänzen: Array `X_FIGURES` in `assets/app.js`
  (Name + X-Handle).
- **Kategorien**: Array `CATEGORIES` in `assets/app.js` – muss zu den in
  `SEED_ARTICLES`/`LIVE_QUERIES` verwendeten Kategorienamen passen.

## Struktur

```
index.html          Seitenstruktur
assets/styles.css    Styling (Light/Dark, Karten-Grid, Responsive)
assets/app.js        Daten, Live-Abruf, Filter/Suche, Rendering
```

## Hinweis zu den Live-Daten

Der RSS-Abruf hängt von der Erreichbarkeit der genutzten öffentlichen
CORS-Proxys ab und kann je nach Netzwerk/Firewall variieren. Für einen
produktiven Einsatz empfiehlt sich ein eigener kleiner Backend-Endpunkt, der
die RSS-Feeds serverseitig abruft und cached, statt sich auf Drittanbieter-
Proxys zu verlassen.
