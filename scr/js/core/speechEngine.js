/**
 * SpeechEngine
 * Kapselt die Web Speech API (SpeechSynthesis) in einer schlanken Klasse.
 * Kennt keine DOM-Elemente — nur reine Sprachlogik.
 */
export class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.utterance = null;

    this.onStart = () => {};
    this.onEnd = () => {};
    this.onError = () => {};
    this.onPauseEvent = () => {};
    this.onResumeEvent = () => {};
  }

  static isSupported() {
    return 'speechSynthesis' in window;
  }

  getVoices() {
    return this.synth.getVoices();
  }

  onVoicesChanged(callback) {
    if (typeof this.synth.onvoiceschanged !== 'undefined') {
      this.synth.onvoiceschanged = callback;
    }
  }

  speak(text, options = {}) {
    this.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    if (options.voice) utterance.voice = options.voice;
    utterance.rate = options.rate ?? 1;
    utterance.pitch = options.pitch ?? 1;
    utterance.volume = options.volume ?? 1;

    utterance.onstart = () => this.onStart();
    utterance.onend = () => this.onEnd();
    utterance.onerror = (event) => this.onError(event);
    utterance.onpause = () => this.onPauseEvent();
    utterance.onresume = () => this.onResumeEvent();

    this.utterance = utterance;
    this.synth.speak(utterance);
  }

  pause() {
    if (this.synth.speaking && !this.synth.paused) {
      this.synth.pause();
    }
  }

  resume() {
    if (this.synth.paused) {
      this.synth.resume();
    }
  }

  stop() {
    this.cancel();
  }

  cancel() {
    this.synth.cancel();
  }

  get isSpeaking() {
    return this.synth.speaking;
  }

  get isPaused() {
    return this.synth.paused;
  }
}
