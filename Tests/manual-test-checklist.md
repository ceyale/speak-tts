# Manuelle Test-Checkliste

Da die App direkt auf Browser-APIs (`speechSynthesis`) aufbaut, gibt es keine
automatisierten Unit-Tests. Vor jedem Release stattdessen manuell prüfen:

## Grundfunktion

- [ ] Text eingeben → **Sprechen** klicken → Text wird vorgelesen
- [ ] Zeichenzähler aktualisiert sich beim Tippen
- [ ] Leeres Textfeld → **Sprechen** tut nichts (kein Fehler in der Konsole)

## Regler

- [ ] Geschwindigkeit ändern → hörbar schneller/langsamer
- [ ] Tonhöhe ändern → hörbar höher/tiefer
- [ ] Lautstärke ändern → hörbar leiser/lauter
- [ ] Angezeigter Zahlenwert neben dem Regler stimmt mit der Position überein

## Steuerung

- [ ] **Pause** während der Wiedergabe → Sprache stoppt, Button wird zu "Fortsetzen"
- [ ] **Fortsetzen** → Sprache läuft an der pausierten Stelle weiter
- [ ] **Stopp** → Wiedergabe bricht sofort ab, Buttons werden zurückgesetzt
- [ ] Status-Anzeige zeigt korrekt: bereit / spricht… / pausiert / fertig / gestoppt

## Stimmenauswahl

- [ ] Dropdown zeigt mehrere Stimmen (abhängig vom System)
- [ ] Deutsche Stimmen erscheinen zuerst in der Liste
- [ ] Wechsel der Stimme wirkt sich auf die nächste Wiedergabe aus

## Browser-Kompatibilität

- [ ] Chrome (Desktop)
- [ ] Edge (Desktop)
- [ ] Safari (Desktop/iOS)
- [ ] Firefox (Hinweis: ggf. weniger Stimmen verfügbar)

## Fehlerfälle

- [ ] Browser ohne Web-Speech-Support → Hinweistext `#unsupported` wird sichtbar
- [ ] Schließen/Neuladen der Seite während der Wiedergabe → keine hängende Sprachausgabe
