#!/usr/bin/env node
// ============================================================
// NextSlide — PPTX Export Script
// Reads embedded JSON from a NextSlide HTML presentation
// and generates an editable .pptx file using PptxGenJS.
//
// Usage:
//   node export-pptx.js <path-to-html> [output-path]
//
// Requirements:
//   npm install pptxgenjs
//
// The HTML must contain:
//   <script type="application/json" id="slide-data">{ ... }</script>
// ============================================================

'use strict';

const fs = require('fs');
const path = require('path');

// ===== HELPERS =====

/**
 * Extract the slide-data JSON block from HTML content.
 */
function extractSlideData(html) {
  const pattern = /<script\s+type=["']application\/json["']\s+id=["']slide-data["']\s*>([\s\S]*?)<\/script>/i;
  const match = html.match(pattern);
  if (!match) {
    throw new Error(
      'No <script type="application/json" id="slide-data"> block found in the HTML file.\n' +
      'Make sure the presentation was generated with NextSlide and includes embedded JSON.'
    );
  }
  try {
    return JSON.parse(match[1]);
  } catch (e) {
    throw new Error(`Failed to parse slide-data JSON: ${e.message}`);
  }
}

/**
 * Convert a percentage string (e.g. "10%") to inches relative to a dimension.
 */
function pctToInches(pctStr, totalInches) {
  if (typeof pctStr === 'number') return pctStr;
  const pct = parseFloat(pctStr) || 0;
  return (pct / 100) * totalInches;
}

/**
 * Normalize a hex color for PptxGenJS (strip leading #).
 */
function normalizeColor(color) {
  if (!color) return '000000';
  return color.replace(/^#/, '');
}

/**
 * Map a text alignment value to PptxGenJS format.
 */
function mapAlign(align) {
  const map = { left: 'left', center: 'center', right: 'right' };
  return map[align] || 'left';
}

/**
 * Map a vertical alignment value to PptxGenJS format.
 */
function mapValign(valign) {
  const map = { top: 'top', middle: 'middle', bottom: 'bottom' };
  return map[valign] || 'top';
}

/**
 * Map shape name to PptxGenJS shape type.
 */
function mapShape(PptxGenJS, shapeName) {
  const shapes = PptxGenJS.ShapeType || {};
  switch (shapeName) {
    case 'rect': return shapes.RECTANGLE || 'rect';
    case 'circle': return shapes.OVAL || 'ellipse';
    case 'line': return shapes.LINE || 'line';
    default: return shapes.RECTANGLE || 'rect';
  }
}

// ===== ELEMENT HANDLERS =====

function addTextElement(slide, el, slideWidth, slideHeight) {
  const pos = el.position || {};
  const style = el.style || {};

  const opts = {
    x: pctToInches(pos.x, slideWidth),
    y: pctToInches(pos.y, slideHeight),
    w: pctToInches(pos.w, slideWidth),
    h: pctToInches(pos.h, slideHeight),
    fontSize: style.fontSize || 24,
    fontFace: style.fontFace || 'Arial',
    bold: style.bold || false,
    italic: style.italic || false,
    color: normalizeColor(style.color),
    align: mapAlign(style.align),
    valign: mapValign(style.valign),
    wrap: true,
    margin: [0, 0, 0, 0],
    paraSpaceAfter: 4,
  };

  // Handle line height
  if (style.lineSpacing) {
    opts.lineSpacing = style.lineSpacing;
  }

  // Handle underline
  if (style.underline) {
    opts.underline = { style: 'sng' };
  }

  slide.addText(el.content || '', opts);
}

function addImageElement(slide, el, slideWidth, slideHeight) {
  const pos = el.position || {};
  const style = el.style || {};

  const x = pctToInches(pos.x, slideWidth);
  const y = pctToInches(pos.y, slideHeight);
  const w = pctToInches(pos.w, slideWidth);
  const h = pctToInches(pos.h, slideHeight);

  const opts = { x, y, w, h };

  // Determine image source
  if (el.src) {
    if (el.src.startsWith('data:')) {
      opts.data = el.src;
    } else if (el.src.startsWith('http://') || el.src.startsWith('https://')) {
      opts.path = el.src;
    } else {
      // Local file path
      opts.path = el.src;
    }
  } else {
    console.warn('  ⚠ Image element has no src — skipping');
    return;
  }

  // Cover sizing
  if (style.objectFit === 'cover') {
    opts.sizing = { type: 'cover', w, h };
  } else if (style.objectFit === 'contain') {
    opts.sizing = { type: 'contain', w, h };
  }

  // Border radius → rounding (approximate)
  if (style.borderRadius && style.borderRadius > 0) {
    opts.rounding = true;
  }

  try {
    slide.addImage(opts);
  } catch (e) {
    console.warn(`  ⚠ Could not add image (${el.src}): ${e.message}`);
  }
}

function addShapeElement(slide, el, slideWidth, slideHeight, PptxGenJS) {
  const pos = el.position || {};
  const style = el.style || {};

  const x = pctToInches(pos.x, slideWidth);
  const y = pctToInches(pos.y, slideHeight);
  const w = pctToInches(pos.w, slideWidth);
  const h = pctToInches(pos.h, slideHeight);

  const shapeType = mapShape(PptxGenJS, el.shape || 'rect');

  const opts = {
    x, y, w, h,
    fill: { color: normalizeColor(style.fill) },
  };

  // Line shape
  if (el.shape === 'line') {
    opts.line = { color: normalizeColor(style.fill || style.color), width: style.lineWidth || 2 };
    delete opts.fill;
  }

  // Border radius
  if (style.borderRadius && style.borderRadius > 0) {
    opts.rectRadius = style.borderRadius / 72; // approximate px to inches
  }

  try {
    slide.addShape(shapeType, opts);
  } catch (e) {
    console.warn(`  ⚠ Could not add shape: ${e.message}`);
  }
}

function addChartElement(slide, el, slideWidth, slideHeight) {
  const pos = el.position || {};
  const style = el.style || {};
  const chartData = el.data || [];

  if (chartData.length === 0) {
    console.warn('  ⚠ Chart element has no data — skipping');
    return;
  }

  const x = pctToInches(pos.x, slideWidth);
  const y = pctToInches(pos.y, slideHeight);
  const w = pctToInches(pos.w, slideWidth);
  const h = pctToInches(pos.h, slideHeight);

  const chartType = el.chartType || 'bar';

  // For simple charts, try native PPTX charts
  if (chartType === 'bar' || chartType === 'bar-horizontal') {
    try {
      const labels = chartData.map(d => d.label);
      const values = chartData.map(d => d.value);
      const type = chartType === 'bar-horizontal' ? 'BAR' : 'BAR';

      slide.addChart(type, [
        {
          name: 'Data',
          labels: labels,
          values: values,
        }
      ], {
        x, y, w, h,
        barDir: chartType === 'bar-horizontal' ? 'bar' : 'col',
        showValue: true,
        showTitle: false,
        showLegend: false,
        chartColors: [normalizeColor(style.barColor || style.color || '#3b82f6')],
        valAxisHidden: true,
        catAxisHidden: false,
        catAxisFontSize: 10,
        valAxisFontSize: 9,
      });
      return;
    } catch (e) {
      console.warn(`  ⚠ Native chart failed, falling back to table: ${e.message}`);
    }
  }

  // Fallback: render as a table
  const tableRows = [
    chartData.map(d => ({
      text: String(d.label),
      options: { bold: true, fontSize: 12, color: normalizeColor(style.labelColor || '#64748b') },
    })),
    chartData.map(d => ({
      text: String(d.value),
      options: { bold: false, fontSize: 14, color: normalizeColor(style.barColor || '#3b82f6') },
    })),
  ];

  slide.addTable(tableRows, {
    x, y, w, h,
    border: { type: 'none' },
    align: 'center',
    valign: 'middle',
    fontSize: 12,
  });
}

// ===== MAIN =====

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
NextSlide PPTX Export
━━━━━━━━━━━━━━━━━━━━

Usage:
  node export-pptx.js <path-to-html> [output-path]

Arguments:
  path-to-html   Path to a NextSlide HTML presentation file
  output-path    (Optional) Output .pptx path. Defaults to same name as input with .pptx extension

Requirements:
  npm install pptxgenjs

Example:
  node export-pptx.js presentation.html
  node export-pptx.js deck.html my-deck.pptx
`);
    process.exit(0);
  }

  const htmlPath = path.resolve(args[0]);
  if (!fs.existsSync(htmlPath)) {
    console.error(`Error: File not found: ${htmlPath}`);
    process.exit(1);
  }

  // Determine output path
  const outputPath = args[1]
    ? path.resolve(args[1])
    : htmlPath.replace(/\.html?$/i, '.pptx');

  // Load PptxGenJS
  let PptxGenJS;
  try {
    PptxGenJS = require('pptxgenjs');
  } catch (e) {
    console.error(
      'Error: pptxgenjs is not installed.\n' +
      'Install it with: npm install pptxgenjs\n'
    );
    process.exit(1);
  }

  console.log(`\n📊 NextSlide PPTX Export`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`  Input:  ${htmlPath}`);
  console.log(`  Output: ${outputPath}\n`);

  // Read HTML and extract JSON
  const html = fs.readFileSync(htmlPath, 'utf-8');
  const data = extractSlideData(html);
  const meta = data.meta || {};

  const slideWidth = meta.slideWidth || 13.333;
  const slideHeight = meta.slideHeight || 7.5;

  // Create PPTX
  const pptx = new PptxGenJS();
  pptx.title = meta.title || 'Presentation';
  pptx.author = meta.author || '';
  pptx.subject = meta.theme || '';

  // Set slide dimensions
  pptx.defineLayout({
    name: 'NEXTSLIDE',
    width: slideWidth,
    height: slideHeight,
  });
  pptx.layout = 'NEXTSLIDE';

  const slides = data.slides || [];
  console.log(`  Processing ${slides.length} slides...\n`);

  for (let i = 0; i < slides.length; i++) {
    const slideData = slides[i];
    const slideNum = i + 1;
    const layout = slideData.layout || 'content';
    const elements = slideData.elements || [];

    console.log(`  Slide ${slideNum} [${layout}] — ${elements.length} element(s)`);

    const slide = pptx.addSlide();

    // Background
    if (slideData.background) {
      if (slideData.background.color) {
        slide.background = { color: normalizeColor(slideData.background.color) };
      }
      if (slideData.background.image) {
        try {
          slide.background = { path: slideData.background.image };
        } catch (e) {
          console.warn(`    ⚠ Background image failed: ${e.message}`);
        }
      }
    }

    // Process elements
    for (const el of elements) {
      switch (el.type) {
        case 'text':
          addTextElement(slide, el, slideWidth, slideHeight);
          break;
        case 'image':
          addImageElement(slide, el, slideWidth, slideHeight);
          break;
        case 'shape':
          addShapeElement(slide, el, slideWidth, slideHeight, PptxGenJS);
          break;
        case 'chart':
          addChartElement(slide, el, slideWidth, slideHeight);
          break;
        default:
          console.warn(`    ⚠ Unknown element type: ${el.type}`);
      }
    }

    // Speaker notes
    if (slideData.notes) {
      slide.addNotes(slideData.notes);
    }
  }

  // Write file
  await pptx.writeFile({ fileName: outputPath });

  console.log(`\n  ✓ Exported ${slides.length} slides to:`);
  console.log(`    ${outputPath}\n`);
  console.log(`  Open in PowerPoint, Google Slides, or Keynote.\n`);
}

main().catch((err) => {
  console.error(`\n  ✗ Export failed: ${err.message}\n`);
  process.exit(1);
});
