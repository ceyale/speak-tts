# Nutzung

## Online (empfohlen)

Nach dem Aktivieren von GitHub Pages (siehe README) einfach im Browser öffnen:

```
https://<dein-username>.github.io/speak-tts/
```

## Lokal, mit Server (empfohlen)

ES-Modul-Importe (`import ... from ...`) funktionieren in den meisten
Browsern nicht zuverlässig über `file://`. Deshalb lokal über einen
einfachen Server starten:

```bash
npx serve src
```

Danach die angezeigte Adresse (z. B. `http://localhost:3000`) im Browser öffnen.

## Lokal, ohne Server

Manche Browser (z. B. aktuelles Chrome) erlauben ES-Module auch über
`file://`. Einfach `src/index.html` per Doppelklick öffnen und ausprobieren.
Bleibt die Seite leer oder erscheint ein Fehler in der Konsole
(`Cross origin requests are only supported...`), bitte die Server-Variante
oben verwenden.

## Bedienung der App

1. Text in das Textfeld eingeben oder einfügen
2. Stimme im Dropdown auswählen (deutsche Stimmen stehen oben)
3. Geschwindigkeit, Tonhöhe und Lautstärke per Regler anpassen
4. **▶ Sprechen** klicken
5. Während der Wiedergabe: **⏸ Pause** / **▶ Fortsetzen** / **■ Stopp**

## Eigene Stimmen hinzufügen

Welche Stimmen zur Auswahl stehen, hängt vom Betriebssystem ab, nicht von
dieser App:

- **Windows:** Einstellungen → Zeit und Sprache → Sprache & Region → Sprachpakete
- **macOS:** Systemeinstellungen → Bedienungshilfen → Vorlesen → Stimmen
- **Android/iOS:** Einstellungen → Bedienungshilfen → Sprachausgabe

Nach der Installation neuer Stimmen die App-Seite neu laden.
