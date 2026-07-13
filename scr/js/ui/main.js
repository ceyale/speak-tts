import { SpeechEngine } from './core/speechEngine.js';
import { VoiceManager } from './core/voiceManager.js';
import { UI } from './ui/ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const engine = new SpeechEngine();
  const voiceManager = new VoiceManager(engine);
  const ui = new UI({ engine, voiceManager });

  ui.init();
});
