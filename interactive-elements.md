# Interactive Elements

Reference for creating charts, timelines, code blocks, and other interactive/data elements in NextSlide presentations. All implementations are **CSS-only** where possible — zero external libraries.

---

## Bar Chart (CSS-Only)

Horizontal or vertical bar chart using CSS Grid + custom properties.

### Horizontal Bar Chart

```html
<div class="ns-chart ns-chart-bar-h">
  <h3 class="ns-chart-title">Revenue by Region</h3>
  <div class="ns-chart-body">
    <div class="ns-bar-row">
      <span class="ns-bar-label">North America</span>
      <div class="ns-bar-track">
        <div class="ns-bar-fill animate-scale-x" style="--ns-bar-value: 85%">
          <span class="ns-bar-value">$2.4M</span>
        </div>
      </div>
    </div>
    <div class="ns-bar-row">
      <span class="ns-bar-label">Europe</span>
      <div class="ns-bar-track">
        <div class="ns-bar-fill animate-scale-x delay-100" style="--ns-bar-value: 65%">
          <span class="ns-bar-value">$1.8M</span>
        </div>
      </div>
    </div>
    <div class="ns-bar-row">
      <span class="ns-bar-label">Asia Pacific</span>
      <div class="ns-bar-track">
        <div class="ns-bar-fill animate-scale-x delay-200" style="--ns-bar-value: 45%">
          <span class="ns-bar-value">$1.2M</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

```css
.ns-chart-bar-h .ns-bar-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  align-items: center;
  gap: var(--ns-space-sm);
  margin-bottom: var(--ns-space-sm);
}

.ns-bar-label {
  font-family: var(--ns-font-body);
  font-size: clamp(14px, 1.5vw, 18px);
  color: var(--ns-text-muted);
  text-align: right;
}

.ns-bar-track {
  height: 32px;
  background: var(--ns-bg-alt);
  border-radius: var(--ns-border-radius);
  overflow: hidden;
}

.ns-bar-fill {
  height: 100%;
  width: var(--ns-bar-value);
  background: var(--ns-primary);
  border-radius: var(--ns-border-radius);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: var(--ns-space-sm);
  transform-origin: left center;
}

.ns-bar-value {
  font-family: var(--ns-font-body);
  font-weight: 600;
  font-size: clamp(12px, 1.2vw, 16px);
  color: white;
}
```

### Vertical Bar Chart

```html
<div class="ns-chart ns-chart-bar-v">
  <h3 class="ns-chart-title">Quarterly Growth</h3>
  <div class="ns-chart-body">
    <div class="ns-bar-col">
      <div class="ns-bar-fill-v animate-scale-y" style="--ns-bar-value: 60%"></div>
      <span class="ns-bar-value">60%</span>
      <span class="ns-bar-label">Q1</span>
    </div>
    <div class="ns-bar-col">
      <div class="ns-bar-fill-v animate-scale-y delay-100" style="--ns-bar-value: 75%"></div>
      <span class="ns-bar-value">75%</span>
      <span class="ns-bar-label">Q2</span>
    </div>
    <div class="ns-bar-col">
      <div class="ns-bar-fill-v animate-scale-y delay-200" style="--ns-bar-value: 90%"></div>
      <span class="ns-bar-value">90%</span>
      <span class="ns-bar-label">Q3</span>
    </div>
    <div class="ns-bar-col">
      <div class="ns-bar-fill-v animate-scale-y delay-300" style="--ns-bar-value: 85%"></div>
      <span class="ns-bar-value">85%</span>
      <span class="ns-bar-label">Q4</span>
    </div>
  </div>
</div>
```

```css
.ns-chart-bar-v .ns-chart-body {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: var(--ns-space-lg);
  height: 300px;
}

.ns-bar-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--ns-space-xs);
  flex: 1;
  max-width: 80px;
}

.ns-bar-fill-v {
  width: 100%;
  height: var(--ns-bar-value);
  background: var(--ns-primary);
  border-radius: var(--ns-border-radius) var(--ns-border-radius) 0 0;
  transform-origin: bottom center;
}
```

---

## Donut/Ring Chart (CSS-Only)

Using conic-gradient for simple percentage displays.

```html
<div class="ns-chart ns-donut-chart">
  <div class="ns-donut" style="--ns-donut-value: 73; --ns-donut-color: var(--ns-primary)">
    <span class="ns-donut-label animate-counter-up" data-target="73">73%</span>
  </div>
  <p class="ns-donut-caption">Customer Satisfaction</p>
</div>
```

```css
.ns-donut {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: conic-gradient(
    var(--ns-donut-color) calc(var(--ns-donut-value) * 3.6deg),
    var(--ns-bg-alt) calc(var(--ns-donut-value) * 3.6deg)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.ns-donut::after {
  content: '';
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: var(--ns-bg);
  position: absolute;
}

.ns-donut-label {
  position: relative;
  z-index: 1;
  font-family: var(--ns-font-heading);
  font-size: 48px;
  font-weight: var(--ns-heading-weight);
  color: var(--ns-text);
}
```

---

## Metric / KPI Card

For displaying key numbers prominently.

```html
<div class="ns-metrics">
  <div class="ns-metric-card animate-fade-up">
    <span class="ns-metric-value" data-target="2.4">$2.4M</span>
    <span class="ns-metric-label">Annual Revenue</span>
    <span class="ns-metric-change positive">↑ 23%</span>
  </div>
  <div class="ns-metric-card animate-fade-up delay-100">
    <span class="ns-metric-value" data-target="847">847</span>
    <span class="ns-metric-label">Active Customers</span>
    <span class="ns-metric-change positive">↑ 12%</span>
  </div>
  <div class="ns-metric-card animate-fade-up delay-200">
    <span class="ns-metric-value" data-target="99.9">99.9%</span>
    <span class="ns-metric-label">Uptime</span>
    <span class="ns-metric-change neutral">→ 0%</span>
  </div>
</div>
```

```css
.ns-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--ns-space-lg);
}

.ns-metric-card {
  background: var(--ns-bg-alt);
  border-radius: var(--ns-border-radius);
  padding: var(--ns-space-lg);
  text-align: center;
}

.ns-metric-value {
  font-family: var(--ns-font-heading);
  font-size: clamp(36px, 4vw, 56px);
  font-weight: var(--ns-heading-weight);
  color: var(--ns-text);
  display: block;
  line-height: 1.1;
}

.ns-metric-label {
  font-family: var(--ns-font-body);
  font-size: clamp(14px, 1.5vw, 18px);
  color: var(--ns-text-muted);
  display: block;
  margin-top: var(--ns-space-xs);
}

.ns-metric-change {
  font-family: var(--ns-font-body);
  font-size: clamp(14px, 1.5vw, 18px);
  font-weight: 600;
  display: block;
  margin-top: var(--ns-space-xs);
}

.ns-metric-change.positive { color: #22c55e; }
.ns-metric-change.negative { color: #ef4444; }
.ns-metric-change.neutral { color: var(--ns-text-muted); }
```

---

## Progress Bar

Simple horizontal progress indicator.

```html
<div class="ns-progress-group">
  <div class="ns-progress-item animate-fade-up">
    <div class="ns-progress-header">
      <span class="ns-progress-label">Design</span>
      <span class="ns-progress-value">85%</span>
    </div>
    <div class="ns-progress-track">
      <div class="ns-progress-fill animate-scale-x" style="--ns-progress: 85%"></div>
    </div>
  </div>
  <div class="ns-progress-item animate-fade-up delay-100">
    <div class="ns-progress-header">
      <span class="ns-progress-label">Development</span>
      <span class="ns-progress-value">60%</span>
    </div>
    <div class="ns-progress-track">
      <div class="ns-progress-fill animate-scale-x" style="--ns-progress: 60%"></div>
    </div>
  </div>
</div>
```

```css
.ns-progress-group {
  display: flex;
  flex-direction: column;
  gap: var(--ns-space-md);
}

.ns-progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--ns-space-xs);
}

.ns-progress-label {
  font-family: var(--ns-font-body);
  font-weight: 500;
  color: var(--ns-text);
}

.ns-progress-value {
  font-family: var(--ns-font-body);
  font-weight: 600;
  color: var(--ns-primary);
}

.ns-progress-track {
  height: 12px;
  background: var(--ns-bg-alt);
  border-radius: 6px;
  overflow: hidden;
}

.ns-progress-fill {
  height: 100%;
  width: var(--ns-progress);
  background: var(--ns-primary);
  border-radius: 6px;
  transform-origin: left center;
}
```

---

## Timeline

Vertical timeline for chronological content.

```html
<div class="ns-timeline">
  <div class="ns-timeline-item animate-fade-left">
    <div class="ns-timeline-marker"></div>
    <div class="ns-timeline-content">
      <span class="ns-timeline-date">Jan 2024</span>
      <h4 class="ns-timeline-title">Project Kickoff</h4>
      <p class="ns-timeline-desc">Initial planning and team assembly</p>
    </div>
  </div>
  <div class="ns-timeline-item animate-fade-right delay-200">
    <div class="ns-timeline-marker"></div>
    <div class="ns-timeline-content">
      <span class="ns-timeline-date">Mar 2024</span>
      <h4 class="ns-timeline-title">Alpha Release</h4>
      <p class="ns-timeline-desc">First internal testing phase</p>
    </div>
  </div>
  <div class="ns-timeline-item animate-fade-left delay-400">
    <div class="ns-timeline-marker active"></div>
    <div class="ns-timeline-content">
      <span class="ns-timeline-date">Jun 2024</span>
      <h4 class="ns-timeline-title">Public Beta</h4>
      <p class="ns-timeline-desc">Open beta with early adopters</p>
    </div>
  </div>
</div>
```

```css
.ns-timeline {
  position: relative;
  padding-left: 40px;
}

.ns-timeline::before {
  content: '';
  position: absolute;
  left: 15px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--ns-bg-alt);
}

.ns-timeline-item {
  position: relative;
  margin-bottom: var(--ns-space-xl);
}

.ns-timeline-marker {
  position: absolute;
  left: -33px;
  top: 4px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--ns-bg);
  border: 3px solid var(--ns-secondary);
}

.ns-timeline-marker.active {
  border-color: var(--ns-primary);
  background: var(--ns-primary);
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.08);
}

.ns-timeline-date {
  font-family: var(--ns-font-body);
  font-size: clamp(12px, 1.2vw, 14px);
  color: var(--ns-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ns-timeline-title {
  font-family: var(--ns-font-heading);
  font-size: clamp(20px, 2vw, 28px);
  color: var(--ns-text);
  margin: var(--ns-space-xs) 0;
}

.ns-timeline-desc {
  font-family: var(--ns-font-body);
  font-size: clamp(14px, 1.5vw, 18px);
  color: var(--ns-text-muted);
}
```

---

## Horizontal Timeline

For timelines that flow left-to-right (good for fewer items).

```html
<div class="ns-timeline-h">
  <div class="ns-timeline-h-item animate-fade-up">
    <div class="ns-timeline-h-dot"></div>
    <span class="ns-timeline-h-date">2020</span>
    <h4>Founded</h4>
  </div>
  <div class="ns-timeline-h-item animate-fade-up delay-200">
    <div class="ns-timeline-h-dot"></div>
    <span class="ns-timeline-h-date">2022</span>
    <h4>Series A</h4>
  </div>
  <div class="ns-timeline-h-item animate-fade-up delay-400">
    <div class="ns-timeline-h-dot active"></div>
    <span class="ns-timeline-h-date">2024</span>
    <h4>IPO</h4>
  </div>
</div>
```

```css
.ns-timeline-h {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  padding-top: 20px;
}

.ns-timeline-h::before {
  content: '';
  position: absolute;
  top: 27px;
  left: 5%;
  right: 5%;
  height: 2px;
  background: var(--ns-bg-alt);
}

.ns-timeline-h-item {
  text-align: center;
  position: relative;
  flex: 1;
}

.ns-timeline-h-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--ns-bg);
  border: 3px solid var(--ns-secondary);
  margin: 0 auto var(--ns-space-sm);
  position: relative;
  z-index: 1;
}

.ns-timeline-h-dot.active {
  border-color: var(--ns-primary);
  background: var(--ns-primary);
}
```

---

## Code Block

Styled code display with optional line numbers. No external syntax highlighter — uses basic CSS coloring.

```html
<div class="ns-code-block animate-fade-up">
  <div class="ns-code-header">
    <span class="ns-code-lang">JavaScript</span>
    <span class="ns-code-filename">app.js</span>
  </div>
  <pre class="ns-code"><code><span class="ns-code-keyword">const</span> <span class="ns-code-variable">app</span> = <span class="ns-code-keyword">express</span>();

app.<span class="ns-code-function">get</span>(<span class="ns-code-string">'/api/data'</span>, <span class="ns-code-keyword">async</span> (req, res) => {
  <span class="ns-code-keyword">const</span> data = <span class="ns-code-keyword">await</span> <span class="ns-code-function">fetchData</span>();
  res.<span class="ns-code-function">json</span>(data);
});</code></pre>
</div>
```

```css
.ns-code-block {
  background: #1e1e2e;
  border-radius: var(--ns-border-radius);
  overflow: hidden;
  font-size: clamp(14px, 1.5vw, 18px);
}

.ns-code-header {
  display: flex;
  justify-content: space-between;
  padding: var(--ns-space-sm) var(--ns-space-md);
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.ns-code-lang, .ns-code-filename {
  font-family: var(--ns-font-body);
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ns-code {
  padding: var(--ns-space-md);
  margin: 0;
  overflow-x: auto;
}

.ns-code code {
  font-family: var(--ns-font-mono);
  color: #cdd6f4;
  line-height: 1.6;
}

/* Basic syntax colors (Catppuccin-inspired) */
.ns-code-keyword { color: #cba6f7; }
.ns-code-string { color: #a6e3a1; }
.ns-code-function { color: #89b4fa; }
.ns-code-variable { color: #f5c2e7; }
.ns-code-comment { color: #6c7086; font-style: italic; }
.ns-code-number { color: #fab387; }
```

---

## Comparison Table

Side-by-side feature comparison.

```html
<div class="ns-comparison animate-fade-up">
  <table class="ns-table">
    <thead>
      <tr>
        <th>Feature</th>
        <th class="ns-highlight">Our Product</th>
        <th>Competitor A</th>
        <th>Competitor B</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Real-time Sync</td>
        <td class="ns-highlight">✓</td>
        <td>✓</td>
        <td>✗</td>
      </tr>
      <tr>
        <td>API Access</td>
        <td class="ns-highlight">✓</td>
        <td>✗</td>
        <td>✓</td>
      </tr>
    </tbody>
  </table>
</div>
```

```css
.ns-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--ns-font-body);
}

.ns-table th, .ns-table td {
  padding: var(--ns-space-sm) var(--ns-space-md);
  text-align: center;
  border-bottom: 1px solid var(--ns-bg-alt);
}

.ns-table th {
  font-weight: 600;
  color: var(--ns-text-muted);
  font-size: clamp(14px, 1.5vw, 18px);
}

.ns-table td {
  font-size: clamp(16px, 1.8vw, 22px);
  color: var(--ns-text);
}

.ns-table th:first-child, .ns-table td:first-child {
  text-align: left;
}

.ns-highlight {
  background: rgba(var(--ns-primary-rgb, 59, 130, 246), 0.08);
  color: var(--ns-primary) !important;
  font-weight: 600;
}
```

---

## Icon Grid

For feature lists or service offerings using emoji or SVG icons.

```html
<div class="ns-icon-grid">
  <div class="ns-icon-card animate-fade-up">
    <div class="ns-icon">🚀</div>
    <h4>Fast Deployment</h4>
    <p>Ship in minutes, not days</p>
  </div>
  <div class="ns-icon-card animate-fade-up delay-100">
    <div class="ns-icon">🔒</div>
    <h4>Secure by Default</h4>
    <p>Enterprise-grade security</p>
  </div>
  <div class="ns-icon-card animate-fade-up delay-200">
    <div class="ns-icon">📊</div>
    <h4>Analytics</h4>
    <p>Real-time insights</p>
  </div>
</div>
```

```css
.ns-icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--ns-space-lg);
}

.ns-icon-card {
  text-align: center;
  padding: var(--ns-space-lg);
}

.ns-icon {
  font-size: 48px;
  margin-bottom: var(--ns-space-sm);
}

.ns-icon-card h4 {
  font-family: var(--ns-font-heading);
  font-size: clamp(18px, 2vw, 24px);
  color: var(--ns-text);
  margin-bottom: var(--ns-space-xs);
}

.ns-icon-card p {
  font-family: var(--ns-font-body);
  font-size: clamp(14px, 1.5vw, 18px);
  color: var(--ns-text-muted);
}
```

---

## JSON Mapping for PPTX Export

When using interactive elements, map them to the embedded JSON for PPTX export:

### Bar Charts → Table in PPTX
```json
{
  "type": "chart",
  "chartType": "bar",
  "data": [
    { "label": "North America", "value": 2.4 },
    { "label": "Europe", "value": 1.8 },
    { "label": "Asia Pacific", "value": 1.2 }
  ],
  "position": { "x": "10%", "y": "25%", "w": "80%", "h": "60%" }
}
```

### Metrics → Text Group in PPTX
```json
{
  "type": "text",
  "content": "$2.4M",
  "role": "title",
  "style": { "fontSize": 48, "fontFace": "Sora", "bold": true, "color": "#1a1a2e" }
},
{
  "type": "text",
  "content": "Annual Revenue ↑ 23%",
  "role": "caption",
  "style": { "fontSize": 18, "fontFace": "Inter", "color": "#64748b" }
}
```

### Timelines → Shapes + Text in PPTX
Each timeline item becomes a circle shape + text elements positioned along a line shape.

### Code Blocks → Formatted Text in PPTX
Code becomes a text element with monospace font on a dark background rectangle shape.
