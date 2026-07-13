# speak:// — Text-to-Speech

A modern, browser-based text-to-speech (TTS) application that leverages the Web Speech API to convert text into natural-sounding speech. The interface is available in German and provides full control over voice parameters like speed, pitch, and volume.

## Features

- 🎤 **Native Voice Support** — Uses your browser and operating system's built-in voices
- ⚙️ **Customizable Speech Parameters**:
  - Voice selection
  - Speed (0.5x to 2x)
  - Pitch (0 to 2)
  - Volume (0 to 1)
- ⏯️ **Playback Controls** — Play, pause, and stop functionality
- 🖥️ **Real-time Character Count** — Track text length as you type
- 🎨 **Clean, Modern UI** — Inspired by system window design

## Supported Browsers

- Chrome/Chromium
- Edge
- Safari

*Note: Firefox support for Web Speech API is limited*

## Project Structure

```
speak-tts/
├── scr/                    # Source files
│   ├── index.html         # Main application entry point
│   ├── css/               # Styling
│   │   ├── variables.css  # CSS custom properties and design tokens
│   │   ├── base.css       # Base typography and layout styles
│   │   └── components.css # Component-specific styling
│   ├── js/                # JavaScript modules
│   │   ├── core/          # Core functionality
│   │   │   ├── speechEngine.js   # Web Speech API wrapper
│   │   │   └── voiceManager.js   # Voice selection and management
│   │   ├── ui/            # UI logic and event handling
│   │   │   ├── main.js    # Application entry point
│   │   │   └── ui.js      # UI interaction handlers
│   │   └── main.js        # Module loader (in scr/js/)
│   └── assets/            # Static assets
├── docs/                  # Documentation
├── examples/              # Usage examples
└── Tests/                 # Test files
```

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ceyale/speak-tts.git
cd speak-tts
```

2. Open the application in your browser:
```bash
# Option 1: Open directly
open scr/index.html

# Option 2: Use a local server (recommended)
python -m http.server 8000
# Then visit http://localhost:8000/scr/
```

### Usage

1. Enter or paste your text in the textarea
2. Select a voice from the dropdown menu
3. Adjust speech parameters as needed:
   - **Geschwindigkeit** (Speed): 0.5 (slow) to 2 (fast)
   - **Tonhöhe** (Pitch): 0 to 2
   - **Lautstärke** (Volume): 0 to 1
4. Click **▶ Sprechen** (Speak) to start playback
5. Use **⏸ Pause** to pause and **■ Stopp** (Stop) to stop playback

## Technical Stack

- **HTML5** — Semantic markup with Web Speech API
- **CSS3** — CSS custom properties, flexbox, and responsive design
- **JavaScript (ES6+)** — Modular architecture using ES modules

## Architecture

### Core Modules

#### `speechEngine.js`
Wraps the Web Speech API (`SpeechSynthesisUtterance`), handling:
- Speech synthesis creation and configuration
- Playback state management
- Event handling (start, end, pause, resume)

#### `voiceManager.js`
Manages voice operations:
- Voice enumeration and population
- Voice selection persistence
- Default voice fallback

### UI Modules

#### `ui.js`
Handles all UI interactions:
- Element binding and event listeners
- Real-time parameter synchronization
- Status updates and visual feedback
- Character count tracking

#### `main.js`
Application initialization and module coordination.

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅ Full | Recommended |
| Edge    | ✅ Full | Chromium-based |
| Safari  | ✅ Full | macOS/iOS |
| Firefox | ⚠️ Limited | Partial Web Speech API support |

## API Reference

### SpeechEngine

```javascript
const engine = new SpeechEngine();

// Set speech parameters
engine.setRate(1.5);      // Speed
engine.setPitch(1.2);     // Pitch
engine.setVolume(0.8);    // Volume
engine.setVoice(voice);   // Voice object

// Control playback
engine.speak(text);       // Start speaking
engine.pause();           // Pause speech
engine.resume();          // Resume speech
engine.cancel();          // Stop and cancel
```

### VoiceManager

```javascript
const manager = new VoiceManager();

// Get available voices
const voices = manager.getVoices();

// Set active voice
manager.setVoice(voice);
const activeVoice = manager.getVoice();
```

## Localization

The UI is currently available in **German** (Deutsch). Contributions for additional languages are welcome!

## Performance Considerations

- Voice loading is asynchronous; voices populate dynamically
- Character count updates are debounced to prevent performance issues
- Styling uses CSS variables for efficient theme switching

## Known Limitations

- Speech synthesis quality depends on the browser and OS
- Some voices may not be available on all systems
- Mobile browsers have limited voice selection
- Web Speech API doesn't support all languages

## Contributing

Contributions are welcome! Here are some ways you can help:

- Report bugs and request features via [Issues](https://github.com/ceyale/speak-tts/issues)
- Submit pull requests with improvements
- Add translations for additional languages
- Improve documentation

## License

[Add license information]

## Author

**ceyale**

## Acknowledgments

- Inspired by modern TTS interfaces and accessibility tools
- Built with the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

**Note:** This application requires a modern browser with Web Speech API support. Some browsers or regions may have limited voice availability.
