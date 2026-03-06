# Presenter Mode

Reference for adding presenter/speaker features to NextSlide presentations. Presenter mode enables a dual-screen setup: audience sees slides, presenter sees notes + controls.

---

## Speaker Notes

Every slide can include speaker notes in an `<aside class="notes">` element:

```html
<section class="slide" data-slide="3" data-layout="content">
  <div class="slide-content">
    <h1>Market Analysis</h1>
    <p>Our market share grew 15% this quarter.</p>
  </div>
  <aside class="notes">
    Key talking points:
    - Mention the competitor acquisition in January
    - Highlight the organic growth vs paid channels
    - Reference the analyst report from Goldman Sachs
    - Transition: "This growth sets the stage for our expansion plans..."
  </aside>
</section>
```

### Notes Styling (hidden from audience view):
```css
.notes {
  display: none; /* Hidden in normal view */
}

/* Visible in presenter window */
.presenter-view .notes {
  display: block;
  font-family: var(--ns-font-body);
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  max-height: 300px;
  overflow-y: auto;
}
```

---

## Presenter Window

Pressing **P** opens a presenter window with:
1. Current slide (large)
2. Next slide preview (smaller)
3. Speaker notes for current slide
4. Timer (elapsed + clock)
5. Slide counter (N / total)

### Presenter Window HTML

The main presentation generates this HTML for the presenter window via `window.open()`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Presenter View — [Presentation Title]</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: #1a1a2e;
      color: #e0e0e0;
      height: 100vh;
      overflow: hidden;
    }

    .presenter-layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      grid-template-rows: 1fr auto;
      height: 100vh;
      gap: 12px;
      padding: 12px;
    }

    /* Current slide (large preview) */
    .current-slide {
      background: #000;
      border-radius: 8px;
      overflow: hidden;
      position: relative;
    }

    .current-slide iframe {
      width: 100%;
      height: 100%;
      border: none;
      pointer-events: none;
    }

    .current-slide-label {
      position: absolute;
      top: 8px;
      left: 12px;
      font-size: 12px;
      color: rgba(255,255,255,0.5);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    /* Right panel: next slide + notes */
    .right-panel {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    /* Next slide preview */
    .next-slide {
      background: #000;
      border-radius: 8px;
      overflow: hidden;
      flex: 0 0 200px;
      position: relative;
    }

    .next-slide iframe {
      width: 100%;
      height: 100%;
      border: none;
      pointer-events: none;
      transform: scale(0.5);
      transform-origin: top left;
      width: 200%;
      height: 200%;
    }

    .next-slide-label {
      position: absolute;
      top: 8px;
      left: 12px;
      font-size: 12px;
      color: rgba(255,255,255,0.5);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    /* Speaker notes */
    .notes-panel {
      flex: 1;
      background: #16213e;
      border-radius: 8px;
      padding: 16px;
      overflow-y: auto;
    }

    .notes-panel h3 {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: rgba(255,255,255,0.5);
      margin-bottom: 12px;
    }

    .notes-content {
      font-size: 18px;
      line-height: 1.6;
      color: #e0e0e0;
      white-space: pre-wrap;
    }

    /* Bottom bar: timer + controls */
    .bottom-bar {
      grid-column: 1 / -1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      background: #16213e;
      border-radius: 8px;
    }

    .timer {
      font-size: 32px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      color: #60a5fa;
    }

    .clock {
      font-size: 18px;
      color: rgba(255,255,255,0.5);
      margin-left: 16px;
    }

    .slide-counter {
      font-size: 24px;
      font-weight: 600;
      color: rgba(255,255,255,0.7);
    }

    .controls {
      display: flex;
      gap: 8px;
    }

    .controls button {
      background: rgba(255,255,255,0.1);
      border: none;
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
    }

    .controls button:hover {
      background: rgba(255,255,255,0.2);
    }
  </style>
</head>
<body>
  <div class="presenter-layout">
    <div class="current-slide">
      <span class="current-slide-label">Current Slide</span>
      <!-- Current slide rendered here -->
      <div id="current-slide-content"></div>
    </div>
    <div class="right-panel">
      <div class="next-slide">
        <span class="next-slide-label">Next</span>
        <div id="next-slide-content"></div>
      </div>
      <div class="notes-panel">
        <h3>Speaker Notes</h3>
        <div class="notes-content" id="speaker-notes">
          No notes for this slide.
        </div>
      </div>
    </div>
    <div class="bottom-bar">
      <div>
        <span class="timer" id="timer">00:00:00</span>
        <span class="clock" id="clock"></span>
      </div>
      <span class="slide-counter" id="slide-counter">1 / 10</span>
      <div class="controls">
        <button id="btn-reset-timer">Reset Timer</button>
        <button id="btn-prev">← Prev</button>
        <button id="btn-next">Next →</button>
      </div>
    </div>
  </div>

  <script>
    // Presenter window JS is generated by the main presentation's controller
    // It syncs via BroadcastChannel API
  </script>
</body>
</html>
```

---

## Sync via BroadcastChannel

The main presentation and presenter window communicate via `BroadcastChannel`:

```javascript
// In main presentation controller
const presenterChannel = new BroadcastChannel('nextslide-presenter');

// When slide changes in main window
function goToSlide(n) {
  currentSlide = n;
  updateSlide();
  presenterChannel.postMessage({
    type: 'slide-change',
    slide: currentSlide,
    total: totalSlides,
    notes: getNotesForSlide(currentSlide)
  });
}

// Listen for navigation from presenter window
presenterChannel.onmessage = (event) => {
  if (event.data.type === 'navigate') {
    goToSlide(event.data.slide);
  }
};

// Open presenter window
function openPresenterWindow() {
  const presenterHTML = generatePresenterHTML();
  const presenterWindow = window.open('', 'nextslide-presenter',
    'width=1200,height=800,menubar=no,toolbar=no');
  presenterWindow.document.write(presenterHTML);
  presenterWindow.document.close();
  
  // Send initial state
  presenterChannel.postMessage({
    type: 'init',
    slide: currentSlide,
    total: totalSlides,
    notes: getNotesForSlide(currentSlide),
    slides: getAllSlideContent()
  });
}
```

```javascript
// In presenter window
const channel = new BroadcastChannel('nextslide-presenter');

channel.onmessage = (event) => {
  switch (event.data.type) {
    case 'init':
    case 'slide-change':
      updateCurrentSlide(event.data.slide);
      updateNextSlide(event.data.slide + 1);
      updateNotes(event.data.notes);
      updateCounter(event.data.slide, event.data.total);
      break;
  }
};

// Navigation buttons in presenter window
document.getElementById('btn-prev').onclick = () => {
  channel.postMessage({ type: 'navigate', slide: currentSlide - 1 });
};

document.getElementById('btn-next').onclick = () => {
  channel.postMessage({ type: 'navigate', slide: currentSlide + 1 });
};
```

---

## Timer

Elapsed timer that starts when presenter mode opens:

```javascript
class PresenterTimer {
  constructor(displayElement, clockElement) {
    this.display = displayElement;
    this.clock = clockElement;
    this.startTime = Date.now();
    this.running = true;
    this.update();
  }

  update() {
    if (!this.running) return;

    // Elapsed timer
    const elapsed = Date.now() - this.startTime;
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    this.display.textContent =
      `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Current clock
    const now = new Date();
    this.clock.textContent = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    requestAnimationFrame(() => this.update());
  }

  reset() {
    this.startTime = Date.now();
  }
}

// Initialize
const timer = new PresenterTimer(
  document.getElementById('timer'),
  document.getElementById('clock')
);

document.getElementById('btn-reset-timer').onclick = () => timer.reset();
```

---

## Keyboard Shortcuts (Presenter Mode)

These shortcuts work in BOTH the main window and presenter window:

| Key | Action |
|---|---|
| `←` or `↑` or `PageUp` | Previous slide |
| `→` or `↓` or `PageDown` or `Space` | Next slide |
| `Home` | First slide |
| `End` | Last slide |
| `1`-`9` | Jump to slide N |
| `P` | Toggle presenter window |
| `F` | Toggle fullscreen (main window) |
| `Escape` | Exit fullscreen / close overview |
| `B` or `.` | Black screen (pause) |

### Black Screen Feature
Pressing `B` or `.` blacks out the audience screen (shows solid black) while presenter view remains visible. Useful for redirecting attention to the speaker.

```javascript
function toggleBlackScreen() {
  document.body.classList.toggle('black-screen');
  presenterChannel.postMessage({ type: 'black-screen', active: document.body.classList.contains('black-screen') });
}
```

```css
.black-screen .slide {
  visibility: hidden;
}

.black-screen {
  background: #000;
}
```

---

## JSON Mapping for PPTX

Speaker notes map to PPTX slide notes:

```json
{
  "layout": "content",
  "elements": [...],
  "notes": "Key talking points:\n- Mention competitor acquisition\n- Highlight organic growth\n- Reference analyst report"
}
```

The `export-pptx.js` script adds notes to each PPTX slide via:
```javascript
slide.addNotes(slideData.notes);
```

---

## When to Include Presenter Mode

Include presenter mode features when:
- User explicitly requests "presenter mode" or "speaker notes"
- User mentions "presenting" or "giving a talk"
- User asks for notes or talking points
- Presentation has 10+ slides (likely a real presentation, not a quick deck)

Always include the `P` keyboard shortcut in the JS controller — the presenter window code is generated on-demand, so it adds minimal weight to the base HTML.
