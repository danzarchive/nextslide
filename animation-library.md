# Animation Library

CSS animation reference for NextSlide. All animations are CSS-only, subtle by default, and respect `prefers-reduced-motion`.

---

## Naming Convention

- Animation classes: `animate-*` prefix → `animate-fade-up`, `animate-scale-in`
- Keyframe names: `ns-*` prefix → `@keyframes ns-fade-up`
- Delays: `delay-*` → `delay-100`, `delay-200`
- Durations: `duration-*` → `duration-fast`, `duration-slow`

---

## Animation Base

All entrance animations share this base. Paste into the `<style>` block:

```css
[class*="animate-"] {
  opacity: 0;
  animation-duration: 500ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  animation-fill-mode: forwards;
}

.slide.active [class*="animate-"] {
  animation-play-state: running;
}

.slide:not(.active) [class*="animate-"] {
  animation-play-state: paused;
  opacity: 0;
}

/* Emphasis animations — already visible elements, no opacity: 0 */
.animate-pulse,
.animate-glow,
.animate-float,
.animate-shimmer {
  opacity: 1;
}
```

---

## Easing Presets

```css
:root {
  --ns-ease-default: cubic-bezier(0.16, 1, 0.3, 1);
  --ns-ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ns-ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ns-ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

---

## Stagger Delays

```css
.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.delay-500 { animation-delay: 500ms; }
.delay-600 { animation-delay: 600ms; }
.delay-800 { animation-delay: 800ms; }
.delay-1000 { animation-delay: 1000ms; }
```

---

## Duration Modifiers

```css
.duration-fast { animation-duration: 300ms; }
.duration-normal { animation-duration: 500ms; }
.duration-slow { animation-duration: 800ms; }
```

---

## Entrance Animations

Start from `opacity: 0`, end at `opacity: 1`. Triggered when slide becomes active.

### 1. animate-fade-up

The default. Use for most content.

```css
@keyframes ns-fade-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up { animation-name: ns-fade-up; }
```

### 2. animate-fade-down

```css
@keyframes ns-fade-down {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-down { animation-name: ns-fade-down; }
```

### 3. animate-fade-left

Content enters from the right side.

```css
@keyframes ns-fade-left {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fade-left { animation-name: ns-fade-left; }
```

### 4. animate-fade-right

Content enters from the left side.

```css
@keyframes ns-fade-right {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-fade-right { animation-name: ns-fade-right; }
```

### 5. animate-fade-in

Simple opacity. No movement.

```css
@keyframes ns-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in { animation-name: ns-fade-in; }
```

### 6. animate-scale-up

Subtle zoom in. Good for images and cards.

```css
@keyframes ns-scale-up {
  from { opacity: 0; transform: scale(0.85); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-up { animation-name: ns-scale-up; }
```

### 7. animate-scale-down

Zoom out entrance.

```css
@keyframes ns-scale-down {
  from { opacity: 0; transform: scale(1.15); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-down { animation-name: ns-scale-down; }
```

### 8. animate-scale-x

Horizontal bar fill. For progress bars and horizontal charts.

```css
@keyframes ns-scale-x {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.animate-scale-x {
  animation-name: ns-scale-x;
  transform-origin: left center;
  opacity: 1;
}
```

### 9. animate-scale-y

Vertical bar fill. For vertical bar charts.

```css
@keyframes ns-scale-y {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}
.animate-scale-y {
  animation-name: ns-scale-y;
  transform-origin: bottom center;
  opacity: 1;
}
```

### 10. animate-blur-in

Dreamy focus-in effect.

```css
@keyframes ns-blur-in {
  from { opacity: 0; filter: blur(10px); }
  to { opacity: 1; filter: blur(0); }
}
.animate-blur-in { animation-name: ns-blur-in; }
```

### 11. animate-flip-x

Card flip on horizontal axis.

```css
@keyframes ns-flip-x {
  from { opacity: 0; transform: perspective(800px) rotateX(90deg); }
  to { opacity: 1; transform: perspective(800px) rotateX(0); }
}
.animate-flip-x { animation-name: ns-flip-x; }
```

### 12. animate-flip-y

Card flip on vertical axis.

```css
@keyframes ns-flip-y {
  from { opacity: 0; transform: perspective(800px) rotateY(90deg); }
  to { opacity: 1; transform: perspective(800px) rotateY(0); }
}
.animate-flip-y { animation-name: ns-flip-y; }
```

### 13. animate-zoom-in

Scale from zero with slight bounce. Good for icons and badges.

```css
@keyframes ns-zoom-in {
  from { opacity: 0; transform: scale(0); }
  60% { opacity: 1; transform: scale(1.08); }
  to { opacity: 1; transform: scale(1); }
}
.animate-zoom-in {
  animation-name: ns-zoom-in;
  animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 14. animate-pop

Playful bounce entrance. Use sparingly and only with Playful Pop / Soft Curves presets.

```css
@keyframes ns-pop {
  0% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1.12); }
  70% { transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
}
.animate-pop {
  animation-name: ns-pop;
  animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
```

### 15. animate-rotate-in

Subtle rotation entrance.

```css
@keyframes ns-rotate-in {
  from { opacity: 0; transform: rotate(-10deg) scale(0.9); }
  to { opacity: 1; transform: rotate(0) scale(1); }
}
.animate-rotate-in { animation-name: ns-rotate-in; }
```

### 16. animate-slide-in-left

Full slide entrance from the left edge.

```css
@keyframes ns-slide-in-left {
  from { opacity: 0; transform: translateX(-100%); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-slide-in-left { animation-name: ns-slide-in-left; }
```

### 17. animate-slide-in-right

Full slide entrance from the right edge.

```css
@keyframes ns-slide-in-right {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}
.animate-slide-in-right { animation-name: ns-slide-in-right; }
```

### 18. animate-typewriter

Text reveals character-by-character via clip. Requires `display: inline-block` or `block` and fixed width.

```css
@keyframes ns-typewriter {
  from { clip-path: inset(0 100% 0 0); }
  to { clip-path: inset(0 0 0 0); }
}
.animate-typewriter {
  animation-name: ns-typewriter;
  animation-timing-function: steps(40, end);
  animation-duration: 2s;
  opacity: 1;
}
```

### 19. animate-counter-up

**Not a CSS animation.** This is a marker class — the JS controller handles the counting.

Expected behavior: element has `data-target="73"`, JS animates displayed text from 0 to 73 over ~1.5 seconds using `requestAnimationFrame`.

```html
<span class="animate-counter-up" data-target="73">0</span>
```

The JS controller in `html-template.md` implements the counter logic when the slide becomes active.

### 20. animate-draw-line

SVG stroke reveal. For line drawings and path animations.

```css
@keyframes ns-draw-line {
  from { stroke-dashoffset: var(--ns-path-length, 1000); }
  to { stroke-dashoffset: 0; }
}
.animate-draw-line {
  animation-name: ns-draw-line;
  animation-duration: 1.5s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  stroke-dasharray: var(--ns-path-length, 1000);
  opacity: 1;
}
```

Set `--ns-path-length` to the SVG path's total length (via JS `getTotalLength()`).

---

## Emphasis Animations

For already-visible elements. These loop and attract attention.

### 21. animate-pulse

Gentle breathing scale. Good for CTAs and highlight cards.

```css
@keyframes ns-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
.animate-pulse {
  animation: ns-pulse 2s ease-in-out infinite;
  opacity: 1;
}
```

### 22. animate-glow

Soft box-shadow glow. Good for featured elements.

```css
@keyframes ns-glow {
  0%, 100% { box-shadow: 0 0 8px rgba(59, 130, 246, 0.2); }
  50% { box-shadow: 0 0 24px rgba(59, 130, 246, 0.5); }
}
.animate-glow {
  animation: ns-glow 2s ease-in-out infinite;
  opacity: 1;
}
```

### 23. animate-float

Gentle vertical bob. Good for decorative icons.

```css
@keyframes ns-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.animate-float {
  animation: ns-float 3s ease-in-out infinite;
  opacity: 1;
}
```

### 24. animate-shimmer

Background gradient sweep. Loading/skeleton effect.

```css
@keyframes ns-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.animate-shimmer {
  background: linear-gradient(90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: ns-shimmer 2s linear infinite;
  opacity: 1;
}
```

---

## Reduced Motion

Always include. Respects user accessibility preferences.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  [class*="animate-"] {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
}
```

---

## Usage Guidelines

| Element | Recommended Animation | Delay Pattern |
|---|---|---|
| Slide title (H1) | `animate-fade-up` | none |
| Subtitle | `animate-fade-up` | `delay-200` |
| Body text | `animate-fade-up` | `delay-300` |
| Bullet list items | `animate-fade-up` | stagger: `delay-100`, `delay-200`, … |
| Images | `animate-scale-up` or `animate-fade-in` | `delay-200` |
| Chart bars (horizontal) | `animate-scale-x` | stagger `delay-100` |
| Chart bars (vertical) | `animate-scale-y` | stagger `delay-100` |
| Metric numbers | `animate-counter-up` | stagger `delay-200` |
| Timeline items | alternate `animate-fade-left` / `animate-fade-right` | stagger `delay-200` |
| Code blocks | `animate-fade-up` | `delay-200` |
| Quote text | `animate-fade-in duration-slow` | none |
| Icons / badges | `animate-zoom-in` or `animate-pop` | stagger `delay-100` |
| Section divider | `animate-fade-up` | none |
| Cards / panels | `animate-scale-up` | stagger `delay-100` |
| Donut charts | `animate-fade-in` | `delay-200` |
| Progress bars | `animate-scale-x` | stagger `delay-100` |

---

## Anti-Patterns

❌ More than 3 animated elements per slide — creates visual chaos
❌ Different animation types on the same slide — keep consistent (all fade-up or all scale-up)
❌ Animating backgrounds or containers — only animate content elements
❌ Bouncy/spring animations on formal presets — use `animate-pop` only with Playful Pop or Soft Curves
❌ Duration longer than 800ms — feels sluggish, breaks presentation rhythm
❌ No stagger on lists — always stagger bullets and grid items (100-200ms increments)
❌ Animating every element — leave some static for visual anchoring
❌ Using `animate-slide-in-*` for small elements — those are for full-panel reveals
