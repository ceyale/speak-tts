# Architektur

## Überblick

Die App ist bewusst framework-frei gehalten und in drei Schichten aufgeteilt:

```
src/js/
├── core/               # reine Logik, kennt kein DOM
│   ├── speechEngine.js  # Wrapper um window.speechSynthesis
│   └── voiceManager.js  # lädt & sortiert verfügbare Stimmen
├── ui/
│   └── ui.js             # verbindet DOM-Elemente mit core/
└── main.js               # Einstiegspunkt, instanziiert alles
```

## Warum diese Trennung?

**`core/speechEngine.js`** kapselt jede Interaktion mit der Web Speech API.
Es kennt keine IDs, keine Buttons, keine Textfelder — nur Text rein,
Ereignisse (`onStart`, `onEnd`, `onError`, …) raus. Dadurch lässt sich diese
Datei isoliert wiederverwenden, z. B. im Minimalbeispiel unter `examples/`.

**`core/voiceManager.js`** löst ein konkretes Browser-Problem: Chrome lädt
die Stimmenliste teils asynchron nach (`onvoiceschanged`). Diese Klasse
kapselt das Nachladen und die Sortierlogik (deutsche Stimmen zuerst), damit
`ui.js` sich darum nicht kümmern muss.

**`ui/ui.js`** ist die einzige Datei, die `document.getElementById` aufruft.
Sie verbindet Konstruktor-Instanzen von `SpeechEngine` und `VoiceManager`
mit den tatsächlichen DOM-Elementen und reagiert auf Nutzerinteraktionen.

**`main.js`** ist der einzige Ort, an dem alle drei Module zusammen
instanziiert werden. Wenn eine Komponente ausgetauscht werden soll (z. B.
eine andere UI, ein anderes Voice-Sortierverhalten), reicht es, hier die
Verdrahtung zu ändern.

## Datenfluss

```
Nutzer-Eingabe (DOM)
        │
        ▼
     ui.js  ──── liest Regler/Text, ruft engine.speak(...) auf
        │
        ▼
speechEngine.js  ──── ruft window.speechSynthesis.speak(...) auf
        │
        ▼
 Events (onstart, onend, …)
        │
        ▼
     ui.js  ──── aktualisiert Status-Anzeige & Buttons
```

## Warum `src/`?

HTML, CSS und JS liegen gebündelt unter `src/`, damit Projektwurzel und
Auslieferungsordner klar getrennt sind. Der Deployment-Workflow
(`.github/workflows/deploy-pages.yml`) liefert gezielt nur `src/` an
GitHub Pages aus — Dateien wie `docs/`, `tests/` oder `examples/` landen
nicht versehentlich in der Live-Version.
