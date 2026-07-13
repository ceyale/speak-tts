/**
 * VoiceManager
 * Lädt verfügbare Stimmen und sortiert sie (deutsche Stimmen zuerst).
 */
export class VoiceManager {
  constructor(speechEngine) {
    this.engine = speechEngine;
    this.voices = [];
  }

  load() {
    this.voices = this._sort(this.engine.getVoices());
    return this.voices;
  }

  watch(callback) {
    this.engine.onVoicesChanged(() => {
      const voices = this.load();
      callback(voices);
    });
  }

  findByName(name) {
    return this.voices.find((voice) => voice.name === name);
  }

  _sort(voices) {
    return [...voices].sort((a, b) => {
      const aGerman = a.lang.startsWith('de') ? 0 : 1;
      const bGerman = b.lang.startsWith('de') ? 0 : 1;
      if (aGerman !== bGerman) return aGerman - bGerman;
      return a.name.localeCompare(b.name);
    });
  }
}
