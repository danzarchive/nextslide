# NextSlide

> "Next slide, please." — An [OpenCode](https://github.com/sst/opencode) skill that generates stunning, professional HTML slide presentations.

**NextSlide** turns any topic into a beautifully designed, self-contained HTML presentation. Every output is a single HTML file — all CSS inline, all JS inline, Google Fonts via CDN. Zero dependencies. Open in any browser and present.

## Features

- **18 curated style presets** — From minimal corporate to cinematic photo-noir, each with hand-picked font pairings, color palettes, and design DNA
- **Single-file output** — One `.html` file. No build step, no server, no dependencies
- **PDF export** — `Ctrl+P → Save as PDF`. Uses `@media print` CSS (same approach as Reveal.js). Zero dependencies
- **PPTX export** — Generates editable PowerPoint files via embedded JSON + [PptxGenJS](https://github.com/gitbrent/PptxGenJS). Instant, deterministic, offline
- **PPTX import** — Extract content from existing `.pptx` files back into structured text/JSON for AI re-design
- **Presenter mode** — Dual-screen with speaker notes, timer, and next-slide preview via BroadcastChannel
- **24 CSS animations** — Entrance + emphasis animations with stagger system, `prefers-reduced-motion` support
- **13 slide layouts** — Title, section, content, two-column, image variants, chart, quote, comparison, timeline, and more
- **Interactive elements** — CSS-only charts, KPI cards, progress bars, timelines, code blocks with syntax colors
- **Responsive scaling** — 1920×1080 base scaled to any viewport, perfect for any screen size
- **Keyboard navigation** — Arrow keys, spacebar, touch/swipe, URL hash, fullscreen (F), black screen (B)

## Installation

### As an OpenCode Skill

```bash
# Clone to your OpenCode skills directory
git clone https://github.com/danzarchive/nextslide.git ~/.config/opencode/skills/nextslide
```

Then add to your `opencode.json` (or it auto-detects from the skills directory).

### Manual Usage

You can also use the reference files directly — the HTML template, CSS, and animation library work standalone. See the file reference below.

## Style Presets

| # | Preset | Heading Font | Mood |
|---|--------|-------------|------|
| 1 | Minimal Clean | Space Grotesk | Clean, Apple-style |
| 2 | Corporate Pro | Sora | Enterprise, trustworthy |
| 3 | Pitch Deck | Archivo Black | Bold, investor-ready |
| 4 | Bold Geometric | Syne | Impactful, editorial |
| 5 | Soft Curves | Outfit | Friendly, warm |
| 6 | Teal Serenity | Plus Jakarta Sans | Calm, modern |
| 7 | Asymmetric | Bricolage Grotesque | Creative-pro |
| 8 | Bento Grid | Plus Jakarta Sans | Dashboard, organized |
| 9 | Playful Pop | Rubik | Fun, educational |
| 10 | Retro 90s | Chivo | Nostalgic, bold |
| 11 | Editorial | DM Serif Display | Magazine, premium |
| 12 | Data Story | IBM Plex Serif | Research, data-heavy |
| 13 | Classic Luxe | Playfair Display | Elegant, formal |
| 14 | Botanical | Cormorant Garamond | Natural, calm |
| 15 | Creative Studio | Fraunces | Artistic, sophisticated |
| 16 | Midnight Pro | Sora | Tech keynote, dark |
| 17 | Prism Glow | Bodoni Moda | Futuristic, iridescent |
| 18 | Photo Noir | Raleway | Cinematic, TED-style |

## File Structure

```
nextslide/
├── SKILL.md                  # Core workflow (5 phases, design rules, anti-patterns)
├── STYLE_PRESETS.md          # 18 visual presets with full CSS variables
├── viewport-base.css         # Slide container, 13 layouts, nav UI, print CSS
├── html-template.md          # HTML boilerplate, JS controller, JSON schema
├── animation-library.md      # 24 CSS animations, stagger system
├── typography-system.md      # Font pairing docs, size scale with clamp()
├── interactive-elements.md   # CSS-only charts, timelines, code blocks, metrics
├── presenter-mode.md         # Speaker notes, presenter window, sync
├── scripts/
│   ├── export-pptx.js        # HTML → PPTX converter (Node.js + PptxGenJS)
│   └── extract-pptx.py       # PPTX → text/JSON extractor (Python + python-pptx)
├── README.md
└── LICENSE
```

## Export / Import

### PDF Export

Built-in via `@media print` CSS. No extra tools needed:

1. Open the HTML presentation in a browser
2. Press `Ctrl+P` (or `Cmd+P` on Mac)
3. Set orientation to **Landscape**
4. Save as PDF

Each slide becomes one landscape page. Animations are disabled, backgrounds preserved.

### PPTX Export

NextSlide embeds structured JSON metadata in every generated HTML file. The export script reads this JSON to create editable PowerPoint files:

```bash
cd scripts/
npm install          # one-time: installs pptxgenjs
node export-pptx.js presentation.html output.pptx
```

The PPTX output is fully editable — text, images, charts, and speaker notes are preserved as native PowerPoint elements.

### PPTX Import (Content Extraction)

Extract content from existing `.pptx` files for AI-powered redesign:

```bash
pip install python-pptx   # one-time
python scripts/extract-pptx.py presentation.pptx --format text
python scripts/extract-pptx.py presentation.pptx --format json --images-dir ./images
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` `↓` `Space` `Enter` | Next slide |
| `←` `↑` `Backspace` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `F` | Toggle fullscreen |
| `B` `.` | Black screen |
| `P` | Open presenter mode |
| `Esc` | Exit fullscreen |

Touch/swipe navigation is also supported on mobile devices.

## How It Works (AI Workflow)

NextSlide uses a 5-phase workflow:

1. **Detect** — Determine if user wants new slides, a redesign, or modifications
2. **Content Discovery** — Extract key points, structure the narrative
3. **Style Discovery** — Match topic/audience to a style preset (or let user choose)
4. **Generate** — Build the HTML with viewport-base.css, animations, and embedded JSON
5. **Deliver** — Output the file with export instructions

The AI loads reference files progressively — only what's needed for each phase — to minimize context usage.

## Design Principles

- **1 idea per slide** — Cognitive focus over information density
- **8px grid** — All spacing is multiples of 8px
- **60-30-10 color rule** — 60% background, 30% secondary, 10% accent
- **Max 2 fonts** — One heading, one body (curated pairings)
- **40%+ whitespace** — Breathing room is a design element
- **Min 36px titles, 18px body** — Readability on projection
- **Purposeful animations** — Subtle, meaningful, never decorative

## License

MIT — see [LICENSE](LICENSE).

## Credits

- [PptxGenJS](https://github.com/gitbrent/PptxGenJS) — PPTX generation
- [python-pptx](https://python-pptx.readthedocs.io/) — PPTX content extraction
- [Google Fonts](https://fonts.google.com/) — Typography
- Inspired by [Reveal.js](https://revealjs.com/) print approach
