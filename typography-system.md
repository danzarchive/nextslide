# Typography System

Reference guide for NextSlide's curated font pairings. Every preset has a pre-selected heading + body font pair. The AI **never picks fonts randomly** — it always uses the pair defined by the active preset.

---

## Font Selection Criteria

Every font in this system was chosen based on:

| Criterion | Why It Matters |
|---|---|
| **High x-height** | Lowercase letters are proportionally tall → readable from distance (projectors) |
| **Open counters** | Interior spaces of letters (a, e, o, g) are wide → doesn't collapse at small sizes |
| **Strong weight contrast** | Heading 600-700 vs body 400 → clear visual hierarchy |
| **Variable font support** | Fine-tune weight/width with precision |
| **Google Fonts availability** | Free, CDN-hosted, zero licensing issues |
| **Screen optimization** | Designed for screens, not print |
| **Large-size rendering** | Looks stunning at 44px+ for titles |

---

## Font Size Scale

All presentations use this consistent size scale:

| Role | Size Range | CSS | Usage |
|---|---|---|---|
| **H1 (Title)** | 40-56px | `clamp(40px, 4.5vw, 56px)` | Slide titles, hero text |
| **H2 (Heading)** | 32-44px | `clamp(32px, 3.5vw, 44px)` | Section headings |
| **H3 (Subheading)** | 24-36px | `clamp(24px, 2.8vw, 36px)` | Sub-sections |
| **Body** | 18-24px | `clamp(18px, 2vw, 24px)` | Paragraphs, bullets |
| **Subtitle** | 20-28px | `clamp(20px, 2.2vw, 28px)` | Subtitles under H1 |
| **Caption** | 14-18px | `clamp(14px, 1.5vw, 18px)` | Image captions, footnotes |
| **Label** | 12-16px | `clamp(12px, 1.2vw, 16px)` | Chart labels, tags |
| **Mono** | 16-20px | `clamp(16px, 1.6vw, 20px)` | Code blocks |

### Rules:
- **Nothing below 14px** on any visible slide element
- **Title should feel "too big" on your screen** — it's right for a room
- **Line height**: 1.1-1.2 for headings, 1.4-1.6 for body text
- **Letter spacing**: -0.02em for large headings, 0 for body, 0.02em for all-caps labels

---

## Display Fonts (Headings)

Fonts used at 36px+ for titles and headings. Chosen for visual impact and character.

### Geometric Sans

| Font | Weight | Character | Mood |
|---|---|---|---|
| **Space Grotesk** | 600 | Compact, crisp, technical | Modern, tech-forward |
| **Sora** | 700 | Geometric, balanced, clean | Corporate, SaaS |
| **Outfit** | 700 | Rounded, friendly, soft | Approachable, warm |
| **Syne** | 700 | Bold, unconventional, wide | Editorial, impactful |

### Grotesque Sans

| Font | Weight | Character | Mood |
|---|---|---|---|
| **Archivo Black** | 400* | Heavy, industrial, dense | Bold, statement-making |
| **Bricolage Grotesque** | 700 | Expressive, energetic, varied | Creative, professional |
| **Chivo** | 700 | Condensed feel, strong | Professional, clear |
| **Rubik** | 700 | Rounded corners, geometric | Playful, approachable |
| **Raleway** | 700 | Elegant, thin-to-thick weights | Refined, modern |

*Archivo Black is a single-weight font (400 renders as black weight)

### Display Serif

| Font | Weight | Character | Mood |
|---|---|---|---|
| **DM Serif Display** | 400* | High contrast, elegant | Editorial, premium |
| **Playfair Display** | 700 | Classic, high contrast | Luxurious, formal |
| **Bodoni Moda** | 700 | Fashion-grade, dramatic | Premium, editorial |

*DM Serif Display is a single-weight font

### Character Serif

| Font | Weight | Character | Mood |
|---|---|---|---|
| **Fraunces** | 700 | Soft serif, characterful | Sophisticated, creative |
| **Cormorant Garamond** | 700 | Dramatic contrast, tall | Heritage, academic |
| **IBM Plex Serif** | 600 | Rational, trustworthy | Enterprise, data |
| **Newsreader** | 700 | Publication-grade, confident | Publishing, formal |
| **Spectral** | 700 | Modern serif, readable | Research, classic |

---

## Body Fonts (Text)

Fonts used at 18-24px for body text, bullets, and descriptions. Chosen for maximum readability.

### Neutral Sans

| Font | Weight | Character | Readability |
|---|---|---|---|
| **Inter** | 400, 500 | Ultra-readable, neutral, no personality | ★★★★★ |
| **Source Sans 3** | 400, 600 | Adobe's workhorse, clear, professional | ★★★★★ |
| **DM Sans** | 400, 500 | Geometric, clean, slightly warm | ★★★★☆ |

### Humanist Sans

| Font | Weight | Character | Readability |
|---|---|---|---|
| **Manrope** | 400, 500 | Large counters, semi-geometric, friendly | ★★★★★ |
| **Work Sans** | 400, 500 | Wide, open, comfortable for bullets | ★★★★☆ |
| **Lato** | 400, 700 | Semi-rounded, warm, familiar | ★★★★☆ |
| **Nunito Sans** | 400, 600 | Rounded terminals, soft, approachable | ★★★★☆ |
| **Outfit** | 400 | Geometric, modern, doubles as body | ★★★★☆ |

### Technical Sans

| Font | Weight | Character | Readability |
|---|---|---|---|
| **IBM Plex Sans** | 400, 500 | Rational, precise, pairs with Plex Serif | ★★★★★ |

---

## Monospace Font

All presets use the same monospace stack:

```css
--ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
```

JetBrains Mono is loaded via Google Fonts when code blocks are present. Features:
- Increased x-height for readability
- Ligature support for code
- Clear distinction between similar characters (0/O, 1/l/I)

---

## Preset ↔ Font Mapping

Quick reference for which preset uses which fonts:

| # | Preset | Heading Font | Body Font | Category |
|---|---|---|---|---|
| 1 | Minimal Clean | Space Grotesk 600 | Source Sans 3 400 | Sans + Sans |
| 2 | Corporate Pro | Sora 700 | Inter 400 | Sans + Sans |
| 3 | Pitch Deck | Archivo Black | Archivo 400 | Sans + Sans |
| 4 | Bold Geometric | Syne 700 | Inter 400 | Sans + Sans |
| 5 | Soft Curves | Outfit 700 | DM Sans 400 | Sans + Sans |
| 6 | Teal Serenity | Plus Jakarta Sans 700 | Manrope 400 | Sans + Sans |
| 7 | Asymmetric | Bricolage Grotesque 700 | Source Sans 3 400 | Sans + Sans |
| 8 | Bento Grid | Plus Jakarta Sans 700 | Manrope 400 | Sans + Sans |
| 9 | Playful Pop | Rubik 700 | Work Sans 400 | Sans + Sans |
| 10 | Retro 90s | Chivo 700 | Lato 400 | Sans + Sans |
| 11 | Editorial | DM Serif Display | DM Sans 400 | Serif + Sans |
| 12 | Data Story | IBM Plex Serif 600 | IBM Plex Sans 400 | Serif + Sans |
| 13 | Classic Luxe | Playfair Display 700 | Source Sans 3 400 | Serif + Sans |
| 14 | Botanical | Cormorant Garamond 700 | Source Sans 3 400 | Serif + Sans |
| 15 | Creative Studio | Fraunces 700 | IBM Plex Sans 400 | Serif + Sans |
| 16 | Midnight Pro | Sora 700 | Inter 400 | Sans + Sans (dark) |
| 17 | Prism Glow | Bodoni Moda 700 | Manrope 400 | Serif + Sans (dark) |
| 18 | Photo Noir | Raleway 700 | Nunito Sans 400 | Sans + Sans (dark) |

---

## Why These Pairings Work

### Contrast Principle
Every pairing creates contrast between heading and body:
- **Sans heading + same-family body** (Archivo Black + Archivo): Weight creates hierarchy
- **Geometric heading + humanist body** (Sora + Inter): Shape contrast creates interest
- **Serif heading + sans body** (DM Serif Display + DM Sans): Category contrast creates elegance
- **Expressive heading + neutral body** (Syne + Inter): Personality vs readability balance

### The "2 Font" Rule
Never use more than the preset's 2 fonts. If you need emphasis:
- Use **weight** (400 → 600 or 700)
- Use **size** (scale up for emphasis)
- Use **color** (--ns-primary or --ns-accent)
- Use **case** (uppercase for labels, sentence case for body)

Never add a third font. It always looks worse.

---

## Google Fonts Loading

Each preset loads fonts via a `<link>` tag in `<head>`. Load only the weights you need:

```html
<!-- Example: Corporate Pro preset -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

### Loading Rules:
- Always include `display=swap` for performance
- Always add `preconnect` hints
- Load only needed weights (heading weight + body weight + optional medium)
- If code blocks present, add `family=JetBrains+Mono:wght@400` to the same URL
- Combine all families in one `<link>` tag (fewer HTTP requests)

---

## CSS Variable Application

How the font system connects to CSS:

```css
/* Set by preset */
:root {
  --ns-font-heading: 'Sora', sans-serif;
  --ns-font-body: 'Inter', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;
}

/* Applied by viewport-base.css */
h1, h2, h3, h4 {
  font-family: var(--ns-font-heading);
  font-weight: var(--ns-heading-weight);
  line-height: 1.15;
  letter-spacing: -0.02em;
}

p, li, td, span, label {
  font-family: var(--ns-font-body);
  font-weight: var(--ns-body-weight);
  line-height: 1.5;
}

code, pre, .mono {
  font-family: var(--ns-font-mono);
  font-weight: 400;
}

strong, b {
  font-weight: 600;
}
```

---

## Anti-Patterns

❌ **Random font selection** — always use the preset's pair
❌ **Three or more fonts** — max 2 (heading + body)
❌ **Similar fonts paired** — pairing two geometric sans creates visual mush
❌ **Body font as heading** — body fonts lack the character for large sizes
❌ **Heading font for long text** — display fonts reduce readability at body sizes
❌ **Inconsistent weights** — stick to the preset's defined weights
❌ **All-caps body text** — only use all-caps for short labels and tags
❌ **Justified text** — creates uneven spacing, always use left-align for body
❌ **Decorative/script fonts** — never use for presentations (readability issue)
