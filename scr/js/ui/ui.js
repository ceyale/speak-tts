/**
 * UI
 * Verbindet DOM-Elemente mit SpeechEngine und VoiceManager (aus core/).
 * Enthält keine direkten Web-Speech-API-Aufrufe, nur Wiring.
 */
export class UI {
  constructor({ engine, voiceManager }) {
    this.engine = engine;
    this.voiceManager = voiceManager;

    this.els = {
      unsupported: document.getElementById('unsupported'),
      text: document.getElementById('text'),
      charcount: document.getElementById('charcount'),
      voice: document.getElementById('voice'),
      rate: document.getElementById('rate'),
      pitch: document.getElementById('pitch'),
      volume: document.getElementById('volume'),
      rateVal: document.getElementById('rateVal'),
      pitchVal: document.getElementById('pitchVal'),
      volVal: document.getElementById('volVal'),
      playBtn: document.getElementById('playBtn'),
      pauseBtn: document.getElementById('pauseBtn'),
      stopBtn: document.getElementById('stopBtn'),
      status: document.getElementById('status'),
    };
  }

  init() {
    if (!('speechSynthesis' in window)) {
      this.els.unsupported.style.display = 'block';
      this.els.playBtn.disabled = true;
      return;
    }

    this._populateVoices(this.voiceManager.load());
    this.voiceManager.watch((voices) => this._populateVoices(voices));

    this._bindEngineEvents();
    this._bindControlEvents();
    this._updateCharCount();
  }

  _populateVoices(voices) {
    this.els.voice.innerHTML = '';
    voices.forEach((voice) => {
      const option = document.createElement('option');
      option.value = voice.name;
      option.textContent = `${voice.name} (${voice.lang})`;
      this.els.voice.appendChild(option);
    });
  }

  _bindEngineEvents() {
    this.engine.onStart = () => {
      this._setStatus('spricht…', true);
      this._setButtons({ playing: true, paused: false });
    };
    this.engine.onEnd = () => {
      this._setStatus('fertig', false);
      this._setButtons({ playing: false, paused: false });
    };
    this.engine.onError = () => {
      this._setStatus('fehler', false);
      this._setButtons({ playing: false, paused: false });
    };
    this.engine.onPauseEvent = () => {
      this._setStatus('pausiert', false);
      this._setButtons({ playing: false, paused: true });
    };
    this.engine.onResumeEvent = () => {
      this._setStatus('spricht…', true);
      this._setButtons({ playing: true, paused: false });
    };
  }

  _bindControlEvents() {
    this.els.text.addEventListener('input', () => this._updateCharCount());

    this.els.rate.addEventListener('input', () => {
      this.els.rateVal.textContent = parseFloat(this.els.rate.value).toFixed(1);
    });
    this.els.pitch.addEventListener('input', () => {
      this.els.pitchVal.textContent = parseFloat(this.els.pitch.value).toFixed(1);
    });
    this.els.volume.addEventListener('input', () => {
      this.els.volVal.textContent = parseFloat(this.els.volume.value).toFixed(2);
    });

    this.els.playBtn.addEventListener('click', () => this._handlePlay());
    this.els.pauseBtn.addEventListener('click', () => this._handlePauseResume());
    this.els.stopBtn.addEventListener('click', () => this._handleStop());

    window.addEventListener('beforeunload', () => this.engine.cancel());
  }

  _handlePlay() {
    const text = this.els.text.value.trim();
    if (!text) return;

    const voice = this.voiceManager.findByName(this.els.voice.value);

    this.engine.speak(text, {
      voice,
      rate: parseFloat(this.els.rate.value),
      pitch: parseFloat(this.els.pitch.value),
      volume: parseFloat(this.els.volume.value),
    });
  }

  _handlePauseResume() {
    if (this.engine.isSpeaking && !this.engine.isPaused) {
      this.engine.pause();
    } else if (this.engine.isPaused) {
      this.engine.resume();
    }
  }

  _handleStop() {
    this.engine.stop();
    this._setStatus('gestoppt', false);
    this._setButtons({ playing: false, paused: false });
  }

  _updateCharCount() {
    this.els.charcount.textContent = `${this.els.text.value.length} Zeichen`;
  }

  _setStatus(text, speaking) {
    this.els.status.querySelector('span').textContent = text;
    this.els.status.classList.toggle('speaking', !!speaking);
  }

  _setButtons({ playing, paused }) {
    this.els.playBtn.disabled = playing;
    this.els.pauseBtn.disabled = !playing && !paused;
    this.els.pauseBtn.textContent = paused ? '▶ Fortsetzen' : '⏸ Pause';
    this.els.stopBtn.disabled = !playing && !paused;
  }
}
