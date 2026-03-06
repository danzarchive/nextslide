# NextSlide

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Say what you need. Get slides a designer would ship.

An [OpenCode](https://github.com/sst/opencode) skill that turns any topic into a single, self-contained HTML presentation — all CSS inline, all JS inline, fonts via CDN. No build step. No server. No dependencies. Open in any browser and present.

---

## Features

- **Single-file output** -- One `.html` file with everything embedded. No build step, no server, no runtime dependencies
- **18 curated style presets** -- Hand-picked font pairings, color palettes, and design DNA for every context
- **PDF export** -- `Ctrl+P` and save. Uses `@media print` CSS for clean landscape pages, same approach as Reveal.js
- **PPTX export** -- Editable PowerPoint via embedded JSON metadata and [PptxGenJS](https://github.com/gitbrent/PptxGenJS). Instant, deterministic, offline
- **PPTX import** -- Extract content from existing `.pptx` files into structured text or JSON for AI-powered redesign
- **Presenter mode** -- Dual-screen with speaker notes, countdown timer, and next-slide preview via BroadcastChannel
- **24 CSS animations** -- 20 entrance + 4 emphasis animations with stagger delays and `prefers-reduced-motion` support
- **13 slide layouts** -- Title, section, content, two-column, image-left/right/full, chart, quote, bullets, comparison, timeline, blank

---

## Installation

Clone to your OpenCode skills directory:

```bash
git clone https://github.com/danzarchive/nextslide.git ~/.config/opencode/skills/nextslide
```

OpenCode auto-detects skills from this directory. No additional configuration needed.

For PPTX export support, install the Node.js dependency:

```bash
cd ~/.config/opencode/skills/nextslide/scripts && npm install
```

For PPTX import (content extraction from existing .pptx files):

```bash
pip install python-pptx
```

---

## Quick Start

NextSlide is an AI skill — you interact with it through natural language in OpenCode. Here are some example prompts:

**Create from scratch:**

```
Buat presentasi tentang AI trends 2026, 12 slides, style pitch deck
```

```
Create a quarterly business review deck for Q1 2026. Use corporate pro style.
```

**Redesign an existing file:**

```
Redesign this pptx with a more modern look — use the editorial preset
```

**Modify and export:**

```
Add speaker notes to all slides and show me how to export to PowerPoint
```

The AI handles everything: content structuring, visual design, animations, layout — and outputs a single `.html` file you can present immediately.

---

## How It Works

NextSlide uses a 5-phase workflow. The AI loads reference files progressively — only what's needed for each phase — to minimize context and maximize quality.

```
1. Detect       What does the user need? New deck, edit, convert, or export?
2. Content      Extract key points, build narrative arc, structure into slides
3. Style        Match topic and audience to a preset, or let the user choose
4. Generate     Build the HTML — embed CSS, JS, fonts, animations, JSON metadata
5. Deliver      Output the file with export instructions
```

Phase 3 is where the user picks a visual identity from 18 curated presets. Phase 4 assembles everything into a single self-contained HTML file that works offline, on any screen, in any browser.

---

## Style Presets

18 hand-crafted visual identities. Each preset defines a complete color palette, curated font pairing, spacing system, and design mood.

### Light Themes

| # | Name | Fonts | Palette (bg / primary / accent) | Best For |
|---|------|-------|---------------------------------|----------|
| 1 | Minimal Clean | Space Grotesk + Source Sans 3 | `#ffffff` / `#3b82f6` / `#f59e0b` | Product launches, SaaS demos |
| 2 | Corporate Pro | Sora + Inter | `#ffffff` / `#2563eb` / `#dc2626` | Board decks, quarterly reports |
| 4 | Bold Geometric | Syne + Inter | `#fafaf9` / `#dc2626` / `#ea580c` | Creative agencies, manifestos |
| 5 | Soft Curves | Outfit + DM Sans | `#fffbf5` / `#f97066` / `#fb923c` | Health, wellness, education |
| 6 | Teal Serenity | Plus Jakarta Sans + Manrope | `#f0fdfa` / `#14b8a6` / `#06b6d4` | Healthcare, sustainability |
| 7 | Asymmetric | Bricolage Grotesque + Source Sans 3 | `#f5f5f4` / `#6366f1` / `#a78bfa` | Design studios, portfolios |
| 8 | Bento Grid | Plus Jakarta Sans + Manrope | `#fafafa` / `#3b82f6` / `#10b981` | Product demos, dashboards |
| 9 | Playful Pop | Rubik + Work Sans | `#ffffff` / `#7c3aed` / `#fbbf24` | Workshops, training |
| 10 | Retro 90s | Chivo + Lato | `#fef9ef` / `#ea580c` / `#ca8a04` | Marketing, creative pitches |
| 11 | Editorial | DM Serif Display + DM Sans | `#faf9f7` / `#991b1b` / `#b45309` | Fashion, thought leadership |
| 12 | Data Story | IBM Plex Serif + IBM Plex Sans | `#ffffff` / `#1e40af` / `#0891b2` | Research, analytics |
| 13 | Classic Luxe | Playfair Display + Source Sans 3 | `#fefce8` / `#92400e` / `#166534` | Galas, formal proposals |
| 14 | Botanical | Cormorant Garamond + Source Sans 3 | `#f0fdf4` / `#15803d` / `#a16207` | Sustainability, organic brands |
| 15 | Creative Studio | Fraunces + IBM Plex Sans | `#faf5ee` / `#c2410c` / `#65a30d` | Art exhibitions, design |

### Dark Themes

| # | Name | Fonts | Palette (bg / primary / accent) | Best For |
|---|------|-------|---------------------------------|----------|
| 3 | Pitch Deck | Archivo Black + Archivo | `#0f172a` / `#22c55e` / `#f97316` | Startup pitches, demo days |
| 16 | Midnight Pro | Sora + Inter | `#0f172a` / `#3b82f6` / `#22d3ee` | Tech keynotes, dev talks |
| 17 | Prism Glow | Bodoni Moda + Manrope | `#1e1b4b` / `#8b5cf6` / `#ec4899` | AI/ML talks, future tech |
| 18 | Photo Noir | Raleway + Nunito Sans | `#111827` / `#e5e7eb` / `#f59e0b` | Photography, TED-style talks |

Full CSS variable blocks for each preset are in [`STYLE_PRESETS.md`](STYLE_PRESETS.md).

---

## Export and Import

### PDF

Built into every generated presentation via `@media print` CSS:

1. Open the `.html` file in a browser
2. `Ctrl+P` (or `Cmd+P` on Mac)
3. Set orientation to **Landscape**
4. Save as PDF

Each slide maps to one landscape page. Animations disabled, backgrounds preserved.

### PPTX Export

Every generated HTML file embeds structured JSON metadata. The export script reads it to produce an editable `.pptx`:

```bash
cd ~/.config/opencode/skills/nextslide/scripts
node export-pptx.js ~/presentation.html ~/output.pptx
```

Text, images, charts, and speaker notes are preserved as native PowerPoint elements.

### PPTX Import

Extract content from an existing `.pptx` for AI-powered redesign:

```bash
# Human-readable text (good for feeding back to AI)
python scripts/extract-pptx.py deck.pptx --format text

# Structured JSON with image extraction
python scripts/extract-pptx.py deck.pptx --format json --images-dir ./extracted-images
```

---

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

Touch and swipe navigation is supported on mobile.

---

## Design Philosophy

Every design decision in NextSlide follows these principles:

- **One idea per slide** -- Cognitive focus over information density
- **8px spacing grid** -- All spacing values are multiples of 8
- **60-30-10 color rule** -- 60% background, 30% secondary surface, 10% accent
- **Two fonts maximum** -- One heading, one body, from curated pairings
- **40%+ whitespace** -- Breathing room is a design element, not wasted space
- **Minimum 36px titles, 18px body** -- Readability at projection distance
- **Purposeful animation** -- Subtle and meaningful, never decorative

---

## File Reference

```
nextslide/
├── SKILL.md                  # Core 5-phase workflow, design rules, anti-patterns
├── STYLE_PRESETS.md          # 18 presets with complete CSS variable blocks
├── viewport-base.css         # Slide container, 13 layouts, nav UI, print CSS
├── html-template.md          # HTML boilerplate, JS controller (~200 lines), JSON schema
├── animation-library.md      # 24 CSS animations with stagger system
├── typography-system.md      # Font pairing rationale, clamp() size scale
├── interactive-elements.md   # CSS-only charts, timelines, code blocks, KPI cards
├── presenter-mode.md         # Speaker notes, presenter window, BroadcastChannel sync
└── scripts/
    ├── export-pptx.js        # HTML → editable PPTX (Node.js + PptxGenJS)
    ├── extract-pptx.py       # PPTX → text/JSON content extractor (Python + python-pptx)
    └── package.json          # Dependencies for export script
```

---

## Contributing

Contributions are welcome. Some ideas:

- **New style presets** -- Follow the format in `STYLE_PRESETS.md`. Every preset needs a complete `:root` variable block, curated font pair from Google Fonts, and a clear design rationale.
- **New slide layouts** -- Add to `viewport-base.css` and document in `html-template.md`.
- **New animations** -- Add to `animation-library.md`. Must include `prefers-reduced-motion` fallback.
- **Bug reports** -- Open an issue with the generated HTML file attached if possible.

Please keep the single-file, zero-dependency philosophy. No frameworks. No build tools. No external JS libraries in the generated output.

---

## License

MIT -- see [LICENSE](LICENSE).

---

## Credits

- [PptxGenJS](https://github.com/gitbrent/PptxGenJS) -- PPTX generation engine
- [python-pptx](https://python-pptx.readthedocs.io/) -- PPTX content extraction
- [Google Fonts](https://fonts.google.com/) -- All typography
- PDF export approach inspired by [Reveal.js](https://revealjs.com/)
