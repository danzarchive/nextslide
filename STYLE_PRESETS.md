# Style Presets

18 curated visual style presets for NextSlide. Each preset defines a complete color palette, font pairing, and mood — ready to drop into any presentation.

---

## How to Use

This file is loaded during **Phase 3: Style Discovery**. Present the user with preset options based on their topic. After selection, copy the preset's `:root` CSS variables into the generated HTML `<style>` block.

Never mix presets. Never modify colors outside the selected preset. The entire deck uses ONE preset.

---

## Quick Reference

| # | Name | Mood | Category |
|---|---|---|---|
| 1 | Minimal Clean | Apple-style, crisp | Light |
| 2 | Corporate Pro | Enterprise, trustworthy | Light |
| 3 | Pitch Deck | Bold, investor-ready | Dark |
| 4 | Bold Geometric | Impactful, editorial | Light |
| 5 | Soft Curves | Friendly, warm | Light |
| 6 | Teal Serenity | Calm, modern | Light |
| 7 | Asymmetric | Creative, professional | Light |
| 8 | Bento Grid | Dashboard, organized | Light |
| 9 | Playful Pop | Fun, educational | Light |
| 10 | Retro 90s | Nostalgic, bold | Light |
| 11 | Editorial | Magazine, premium | Light |
| 12 | Data Story | Research, analytical | Light |
| 13 | Classic Luxe | Elegant, formal | Light |
| 14 | Botanical | Natural, calm | Light |
| 15 | Creative Studio | Artistic, sophisticated | Light |
| 16 | Midnight Pro | Tech keynote | Dark |
| 17 | Prism Glow | Futuristic, iridescent | Dark |
| 18 | Photo Noir | Cinematic, TED-style | Dark |

---

## Preset 1: Minimal Clean

Apple-style minimalism with generous whitespace. Let content breathe.

**Best for:** Product launches, SaaS demos, tech overviews

```css
:root {
  /* Colors */
  --ns-bg: #ffffff;
  --ns-bg-alt: #f8fafc;
  --ns-text: #1a1a2e;
  --ns-text-muted: #64748b;
  --ns-primary: #3b82f6;
  --ns-secondary: #94a3b8;
  --ns-accent: #f59e0b;

  /* Typography */
  --ns-font-heading: 'Space Grotesk', sans-serif;
  --ns-font-body: 'Source Sans 3', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 600;
  --ns-body-weight: 400;

  /* Spacing */
  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  /* Layout */
  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 8px;
}
```

**Color DNA:** `#ffffff` (clean white bg) · `#3b82f6` (trusted blue primary) · `#f59e0b` (warm amber accent)

```html
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
```

---

## Preset 2: Corporate Pro

Enterprise-grade professionalism. Inspires confidence and trust.

**Best for:** Board presentations, quarterly reports, company all-hands

```css
:root {
  --ns-bg: #ffffff;
  --ns-bg-alt: #f1f5f9;
  --ns-text: #1e293b;
  --ns-text-muted: #475569;
  --ns-primary: #2563eb;
  --ns-secondary: #475569;
  --ns-accent: #dc2626;

  --ns-font-heading: 'Sora', sans-serif;
  --ns-font-body: 'Inter', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 8px;
}
```

**Color DNA:** `#ffffff` (white bg) · `#2563eb` (royal blue primary) · `#dc2626` (red accent for urgency)

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

---

## Preset 3: Pitch Deck

Dark, bold, and confident. Designed to command a room full of investors.

**Best for:** Startup funding, VC pitches, demo days

```css
:root {
  --ns-bg: #0f172a;
  --ns-bg-alt: #1e293b;
  --ns-text: #f8fafc;
  --ns-text-muted: #94a3b8;
  --ns-primary: #22c55e;
  --ns-secondary: #64748b;
  --ns-accent: #f97316;

  --ns-font-heading: 'Archivo Black', sans-serif;
  --ns-font-body: 'Archivo', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 400;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 8px;
}
```

**Color DNA:** `#0f172a` (deep navy bg) · `#22c55e` (electric green growth) · `#f97316` (orange CTA)

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo:wght@400;600&display=swap" rel="stylesheet">
```

---

## Preset 4: Bold Geometric

Punchy and editorial with strong visual hierarchy. Makes statements.

**Best for:** Creative agencies, brand presentations, manifestos

```css
:root {
  --ns-bg: #fafaf9;
  --ns-bg-alt: #f5f5f4;
  --ns-text: #1c1917;
  --ns-text-muted: #78716c;
  --ns-primary: #dc2626;
  --ns-secondary: #78716c;
  --ns-accent: #ea580c;

  --ns-font-heading: 'Syne', sans-serif;
  --ns-font-body: 'Inter', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 8px;
}
```

**Color DNA:** `#fafaf9` (warm off-white) · `#dc2626` (bold red primary) · `#ea580c` (burnt orange accent)

```html
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

---

## Preset 5: Soft Curves

Warm and approachable with rounded aesthetics. Puts people at ease.

**Best for:** Health, wellness, education, HR presentations

```css
:root {
  --ns-bg: #fffbf5;
  --ns-bg-alt: #fef3e2;
  --ns-text: #292524;
  --ns-text-muted: #78716c;
  --ns-primary: #f97066;
  --ns-secondary: #a8a29e;
  --ns-accent: #fb923c;

  --ns-font-heading: 'Outfit', sans-serif;
  --ns-font-body: 'DM Sans', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 16px;
}
```

**Color DNA:** `#fffbf5` (warm cream bg) · `#f97066` (coral primary) · `#fb923c` (peach accent)

```html
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
```

---

## Preset 6: Teal Serenity

Calm and contemporary with refreshing teal tones. Instills clarity.

**Best for:** Healthcare, sustainability, mindfulness, wellness tech

```css
:root {
  --ns-bg: #f0fdfa;
  --ns-bg-alt: #ccfbf1;
  --ns-text: #134e4a;
  --ns-text-muted: #0f766e;
  --ns-primary: #14b8a6;
  --ns-secondary: #5eead4;
  --ns-accent: #06b6d4;

  --ns-font-heading: 'Plus Jakarta Sans', sans-serif;
  --ns-font-body: 'Manrope', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 12px;
}
```

**Color DNA:** `#f0fdfa` (mint bg) · `#14b8a6` (teal primary) · `#06b6d4` (cyan accent)

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700&family=Manrope:wght@400;500&display=swap" rel="stylesheet">
```

---

## Preset 7: Asymmetric

Creative and professional with a designer's edge. Balances art and clarity.

**Best for:** Design studios, architecture firms, creative portfolios

```css
:root {
  --ns-bg: #f5f5f4;
  --ns-bg-alt: #e7e5e4;
  --ns-text: #292524;
  --ns-text-muted: #78716c;
  --ns-primary: #6366f1;
  --ns-secondary: #a1a1aa;
  --ns-accent: #a78bfa;

  --ns-font-heading: 'Bricolage Grotesque', sans-serif;
  --ns-font-body: 'Source Sans 3', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 8px;
}
```

**Color DNA:** `#f5f5f4` (warm gray bg) · `#6366f1` (indigo primary) · `#a78bfa` (violet accent)

```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
```

---

## Preset 8: Bento Grid

Structured and organized with a dashboard aesthetic. Cards and grids shine here.

**Best for:** Product demos, feature overviews, dashboards

**Layout note:** Use grid layouts with card-based content. Pair with `data-layout="blank"` and custom grid CSS for bento-style slides.

```css
:root {
  --ns-bg: #fafafa;
  --ns-bg-alt: #f4f4f5;
  --ns-text: #18181b;
  --ns-text-muted: #71717a;
  --ns-primary: #3b82f6;
  --ns-secondary: #a1a1aa;
  --ns-accent: #10b981;

  --ns-font-heading: 'Plus Jakarta Sans', sans-serif;
  --ns-font-body: 'Manrope', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 12px;
}
```

**Color DNA:** `#fafafa` (near-white bg) · `#3b82f6` (blue primary) · `#10b981` (emerald accent)

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700&family=Manrope:wght@400;500&display=swap" rel="stylesheet">
```

---

## Preset 9: Playful Pop

Energetic and joyful with vibrant accents. Makes learning fun.

**Best for:** Workshops, training sessions, educational content

```css
:root {
  --ns-bg: #ffffff;
  --ns-bg-alt: #f5f3ff;
  --ns-text: #1e1b4b;
  --ns-text-muted: #6b7280;
  --ns-primary: #7c3aed;
  --ns-secondary: #a78bfa;
  --ns-accent: #fbbf24;

  --ns-font-heading: 'Rubik', sans-serif;
  --ns-font-body: 'Work Sans', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 16px;
}
```

**Color DNA:** `#ffffff` (white bg) · `#7c3aed` (vivid purple primary) · `#fbbf24` (golden yellow accent)

```html
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@700&family=Work+Sans:wght@400;500&display=swap" rel="stylesheet">
```

---

## Preset 10: Retro 90s

Nostalgic warmth with bold typographic energy. Stands out from the crowd.

**Best for:** Pop culture, marketing campaigns, creative pitches

```css
:root {
  --ns-bg: #fef9ef;
  --ns-bg-alt: #fef3c7;
  --ns-text: #44403c;
  --ns-text-muted: #78716c;
  --ns-primary: #ea580c;
  --ns-secondary: #0d9488;
  --ns-accent: #ca8a04;

  --ns-font-heading: 'Chivo', sans-serif;
  --ns-font-body: 'Lato', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 8px;
}
```

**Color DNA:** `#fef9ef` (warm cream bg) · `#ea580c` (burnt orange primary) · `#0d9488` (teal secondary)

```html
<link href="https://fonts.googleapis.com/css2?family=Chivo:wght@700&family=Lato:wght@400;700&display=swap" rel="stylesheet">
```

---

## Preset 11: Editorial

Magazine-quality elegance with serif headings. Premium and authoritative.

**Best for:** Fashion, luxury brands, publishing, thought leadership

```css
:root {
  --ns-bg: #faf9f7;
  --ns-bg-alt: #f5f5f0;
  --ns-text: #1a1a1a;
  --ns-text-muted: #737373;
  --ns-primary: #991b1b;
  --ns-secondary: #a3a3a3;
  --ns-accent: #b45309;

  --ns-font-heading: 'DM Serif Display', serif;
  --ns-font-body: 'DM Sans', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 400;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 4px;
}
```

**Color DNA:** `#faf9f7` (warm off-white) · `#991b1b` (deep burgundy primary) · `#b45309` (warm gold accent)

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
```

---

## Preset 12: Data Story

Analytical and structured. Built to make data readable and trustworthy.

**Best for:** Research reports, analytics dashboards, academic presentations

```css
:root {
  --ns-bg: #ffffff;
  --ns-bg-alt: #f1f5f9;
  --ns-text: #1e293b;
  --ns-text-muted: #64748b;
  --ns-primary: #1e40af;
  --ns-secondary: #64748b;
  --ns-accent: #0891b2;

  --ns-font-heading: 'IBM Plex Serif', serif;
  --ns-font-body: 'IBM Plex Sans', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 600;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 6px;
}
```

**Color DNA:** `#ffffff` (white bg) · `#1e40af` (navy primary) · `#0891b2` (teal accent for data points)

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@600&family=IBM+Plex+Sans:wght@400;500&display=swap" rel="stylesheet">
```

---

## Preset 13: Classic Luxe

Timeless elegance with refined serif typography. Commands respect.

**Best for:** Galas, awards ceremonies, luxury events, formal proposals

```css
:root {
  --ns-bg: #fefce8;
  --ns-bg-alt: #fef9c3;
  --ns-text: #1c1917;
  --ns-text-muted: #78716c;
  --ns-primary: #92400e;
  --ns-secondary: #a16207;
  --ns-accent: #166534;

  --ns-font-heading: 'Playfair Display', serif;
  --ns-font-body: 'Source Sans 3', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 4px;
}
```

**Color DNA:** `#fefce8` (warm ivory bg) · `#92400e` (deep gold primary) · `#166534` (forest green accent)

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
```

---

## Preset 14: Botanical

Organic and grounded with nature-inspired tones. Feels alive and verdant.

**Best for:** Sustainability, organic brands, environmental reports

```css
:root {
  --ns-bg: #f0fdf4;
  --ns-bg-alt: #dcfce7;
  --ns-text: #14532d;
  --ns-text-muted: #16a34a;
  --ns-primary: #15803d;
  --ns-secondary: #86efac;
  --ns-accent: #a16207;

  --ns-font-heading: 'Cormorant Garamond', serif;
  --ns-font-body: 'Source Sans 3', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 8px;
}
```

**Color DNA:** `#f0fdf4` (soft sage bg) · `#15803d` (forest green primary) · `#a16207` (earth amber accent)

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
```

---

## Preset 15: Creative Studio

Artistic sophistication with characterful serif headings. Gallery-worthy.

**Best for:** Art exhibitions, creative agencies, design portfolios

```css
:root {
  --ns-bg: #faf5ee;
  --ns-bg-alt: #f5ebe0;
  --ns-text: #292524;
  --ns-text-muted: #78716c;
  --ns-primary: #c2410c;
  --ns-secondary: #a8a29e;
  --ns-accent: #65a30d;

  --ns-font-heading: 'Fraunces', serif;
  --ns-font-body: 'IBM Plex Sans', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 8px;
}
```

**Color DNA:** `#faf5ee` (warm cream bg) · `#c2410c` (terracotta primary) · `#65a30d` (sage green accent)

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700&family=IBM+Plex+Sans:wght@400;500&display=swap" rel="stylesheet">
```

---

## Preset 16: Midnight Pro

Dark and electric. Built for tech keynotes and developer conferences.

**Best for:** Tech keynotes, developer talks, product launches, evening events

```css
:root {
  --ns-bg: #0f172a;
  --ns-bg-alt: #1e293b;
  --ns-text: #e2e8f0;
  --ns-text-muted: #94a3b8;
  --ns-primary: #3b82f6;
  --ns-secondary: #64748b;
  --ns-accent: #22d3ee;

  --ns-font-heading: 'Sora', sans-serif;
  --ns-font-body: 'Inter', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 8px;
}
```

**Color DNA:** `#0f172a` (deep navy bg) · `#3b82f6` (electric blue primary) · `#22d3ee` (cyan glow accent)

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

---

## Preset 17: Prism Glow

Futuristic and mesmerizing with deep purples and neon accents.

**Best for:** AI/ML talks, innovation events, future tech, metaverse content

```css
:root {
  --ns-bg: #1e1b4b;
  --ns-bg-alt: #312e81;
  --ns-text: #e0e7ff;
  --ns-text-muted: #a5b4fc;
  --ns-primary: #8b5cf6;
  --ns-secondary: #6366f1;
  --ns-accent: #ec4899;

  --ns-font-heading: 'Bodoni Moda', serif;
  --ns-font-body: 'Manrope', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 12px;
}
```

**Color DNA:** `#1e1b4b` (deep purple bg) · `#8b5cf6` (violet primary) · `#ec4899` (hot pink accent)

```html
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@700&family=Manrope:wght@400;500&display=swap" rel="stylesheet">
```

---

## Preset 18: Photo Noir

Cinematic and atmospheric. Let photography and stories take center stage.

**Best for:** Photography, storytelling, TED-style talks, memorials

**Layout note:** Best with `image-full` layouts and text overlays. Use minimal text — let images speak.

```css
:root {
  --ns-bg: #111827;
  --ns-bg-alt: #1f2937;
  --ns-text: #f9fafb;
  --ns-text-muted: #9ca3af;
  --ns-primary: #e5e7eb;
  --ns-secondary: #6b7280;
  --ns-accent: #f59e0b;

  --ns-font-heading: 'Raleway', sans-serif;
  --ns-font-body: 'Nunito Sans', sans-serif;
  --ns-font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  --ns-heading-weight: 700;
  --ns-body-weight: 400;

  --ns-space-xs: 8px;
  --ns-space-sm: 16px;
  --ns-space-md: 24px;
  --ns-space-lg: 32px;
  --ns-space-xl: 48px;
  --ns-space-2xl: 64px;

  --ns-slide-padding: 48px 64px;
  --ns-border-radius: 4px;
}
```

**Color DNA:** `#111827` (near-black bg) · `#e5e7eb` (cool white primary) · `#f59e0b` (warm amber accent)

```html
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">
```

---

## Preset Selection by Topic

Quick recommendation guide for Phase 3:

| Topic Area | Recommended Presets |
|---|---|
| Business / Corporate | Corporate Pro, Minimal Clean, Data Story |
| Creative / Design | Editorial, Bold Geometric, Asymmetric |
| Tech / Startup | Pitch Deck, Midnight Pro, Bento Grid |
| Education / Training | Soft Curves, Playful Pop, Teal Serenity |
| Formal / Academic | Classic Luxe, Botanical, Data Story |
| Marketing / Sales | Prism Glow, Photo Noir, Retro 90s |
| Health / Wellness | Teal Serenity, Soft Curves, Botanical |
| Art / Culture | Creative Studio, Editorial, Photo Noir |
