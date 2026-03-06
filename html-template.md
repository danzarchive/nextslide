# HTML Template

Complete reference for the HTML architecture, JavaScript controller, and JSON schema used in every NextSlide presentation.

---

## HTML Boilerplate

Every generated presentation follows this exact structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Presentation Title]</title>

  <!-- Google Fonts (from selected preset) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=[HeadingFont]:wght@[weight]&family=[BodyFont]:wght@400;500&display=swap" rel="stylesheet">

  <style>
    /* 1. CSS Variables — from selected preset (STYLE_PRESETS.md) */
    :root {
      --ns-bg: #ffffff;
      --ns-bg-alt: #f8fafc;
      /* ... all preset variables ... */
    }

    /* 2. Base CSS — full contents of viewport-base.css */
    /* ... paste viewport-base.css here ... */

    /* 3. Animations — selected @keyframes from animation-library.md */
    /* ... only include animations actually used ... */

    /* 4. Custom styles — slide-specific overrides */
    /* ... any additional styles for this presentation ... */
  </style>
</head>
<body>
  <div class="ns-deck">
    <!-- Progress Bar -->
    <div class="ns-progress"><div class="ns-progress-bar"></div></div>

    <!-- Slides -->
    <section class="slide active" data-slide="1" data-layout="title">
      <div class="slide-content">
        <h1 class="animate-fade-up">Presentation Title</h1>
        <p class="subtitle animate-fade-up delay-200">Subtitle goes here</p>
        <p class="meta animate-fade-up delay-400">Author Name · March 2026</p>
      </div>
      <aside class="notes">Speaker notes for this slide...</aside>
    </section>

    <section class="slide" data-slide="2" data-layout="content">
      <div class="slide-content">
        <!-- Content here -->
      </div>
    </section>

    <!-- ... more slides ... -->

    <!-- Navigation Arrows -->
    <div class="ns-nav">
      <button class="ns-nav-prev" aria-label="Previous slide">&#8249;</button>
      <button class="ns-nav-next" aria-label="Next slide">&#8250;</button>
    </div>

    <!-- Slide Counter -->
    <div class="ns-counter">
      <span class="ns-current">1</span> / <span class="ns-total">10</span>
    </div>
  </div>

  <!-- Embedded JSON for PPTX Export -->
  <script type="application/json" id="slide-data">
  {
    "meta": { ... },
    "slides": [ ... ]
  }
  </script>

  <!-- Slide Controller -->
  <script>
    // Full controller code (see Section 2 below)
  </script>
</body>
</html>
```

---

## JavaScript Slide Controller

Complete, production-ready controller. Paste into every presentation's `<script>` block.

```javascript
(function () {
  'use strict';

  // ===== STATE =====
  const SLIDE_WIDTH = 1920;
  const SLIDE_HEIGHT = 1080;

  let currentSlide = 1;
  let totalSlides = 0;
  let isBlackScreen = false;

  const deck = document.querySelector('.ns-deck');
  const slides = document.querySelectorAll('.slide');
  const progressBar = document.querySelector('.ns-progress-bar');
  const counterCurrent = document.querySelector('.ns-current');
  const counterTotal = document.querySelector('.ns-total');
  const navPrev = document.querySelector('.ns-nav-prev');
  const navNext = document.querySelector('.ns-nav-next');

  totalSlides = slides.length;

  // ===== VIEWPORT SCALING =====
  function updateScale() {
    const scaleX = window.innerWidth / SLIDE_WIDTH;
    const scaleY = window.innerHeight / SLIDE_HEIGHT;
    const scale = Math.min(scaleX, scaleY);
    document.documentElement.style.setProperty('--ns-scale', scale);
  }

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateScale, 100);
  });
  updateScale();

  // ===== SLIDE NAVIGATION =====
  function goToSlide(n) {
    n = Math.max(1, Math.min(n, totalSlides));
    if (n === currentSlide && document.querySelector('.slide.active')) return;

    // Deactivate current
    const prev = document.querySelector('.slide.active');
    if (prev) {
      prev.classList.remove('active');
      resetAnimations(prev);
    }

    // Activate target
    currentSlide = n;
    const target = document.querySelector('[data-slide="' + n + '"]');
    if (target) {
      target.classList.add('active');
      triggerAnimations(target);
      runCounterAnimations(target);
    }

    // Update UI
    updateProgressBar();
    updateCounter();
    updateHash();

    // Sync presenter
    syncPresenter();
  }

  function nextSlide() {
    if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    if (currentSlide > 1) goToSlide(currentSlide - 1);
  }

  // ===== PROGRESS BAR =====
  function updateProgressBar() {
    if (progressBar) {
      const pct = (currentSlide / totalSlides) * 100;
      progressBar.style.width = pct + '%';
    }
  }

  // ===== COUNTER =====
  function updateCounter() {
    if (counterCurrent) counterCurrent.textContent = currentSlide;
    if (counterTotal) counterTotal.textContent = totalSlides;
  }

  // ===== URL HASH =====
  function updateHash() {
    history.replaceState(null, '', '#slide-' + currentSlide);
  }

  function readHash() {
    const hash = window.location.hash;
    const match = hash.match(/^#slide-(\d+)$/);
    if (match) {
      const n = parseInt(match[1], 10);
      if (n >= 1 && n <= totalSlides) return n;
    }
    return 1;
  }

  window.addEventListener('hashchange', function () {
    const n = readHash();
    if (n !== currentSlide) goToSlide(n);
  });

  // ===== ANIMATION TRIGGERS =====
  function triggerAnimations(slide) {
    const animated = slide.querySelectorAll('[class*="animate-"]');
    animated.forEach(function (el) {
      // Force restart: remove and re-add animation
      const classes = Array.from(el.classList);
      const animClass = classes.find(function (c) { return c.startsWith('animate-'); });
      if (animClass && animClass !== 'animate-counter-up') {
        el.classList.remove(animClass);
        void el.offsetWidth; // trigger reflow
        el.classList.add(animClass);
      }
    });
  }

  function resetAnimations(slide) {
    const animated = slide.querySelectorAll('[class*="animate-"]');
    animated.forEach(function (el) {
      el.style.opacity = '0';
    });
  }

  // ===== COUNTER-UP ANIMATION =====
  function runCounterAnimations(slide) {
    const counters = slide.querySelectorAll('.animate-counter-up');
    counters.forEach(function (el) {
      const target = parseFloat(el.getAttribute('data-target'));
      if (isNaN(target)) return;

      const duration = 1500;
      const startTime = performance.now();
      const isFloat = target % 1 !== 0;
      const prefix = el.textContent.match(/^[^0-9]*/)[0] || '';
      const suffix = el.textContent.match(/[^0-9]*$/)[0] || '';

      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = eased * target;

        if (isFloat) {
          el.textContent = prefix + value.toFixed(1) + suffix;
        } else {
          el.textContent = prefix + Math.round(value) + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = prefix + target + suffix;
        }
      }
      requestAnimationFrame(tick);
    });
  }

  // ===== KEYBOARD NAVIGATION =====
  document.addEventListener('keydown', function (e) {
    // Ignore if typing in an input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'Home':
        e.preventDefault();
        goToSlide(1);
        break;
      case 'End':
        e.preventDefault();
        goToSlide(totalSlides);
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'p':
      case 'P':
        e.preventDefault();
        openPresenterWindow();
        break;
      case 'b':
      case 'B':
      case '.':
        e.preventDefault();
        toggleBlackScreen();
        break;
      case 'Escape':
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        break;
      default:
        // Number keys 1-9 jump to slide
        if (e.key >= '1' && e.key <= '9') {
          const n = parseInt(e.key, 10);
          if (n <= totalSlides) {
            e.preventDefault();
            goToSlide(n);
          }
        }
    }
  });

  // ===== TOUCH / SWIPE =====
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    // Only trigger if horizontal swipe > 50px and more horizontal than vertical
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) nextSlide();  // swipe left = next
      else prevSlide();          // swipe right = prev
    }
  }, { passive: true });

  // ===== CLICK NAVIGATION =====
  if (navPrev) navPrev.addEventListener('click', prevSlide);
  if (navNext) navNext.addEventListener('click', nextSlide);

  // ===== FULLSCREEN =====
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(function () {});
    } else {
      document.exitFullscreen();
    }
  }

  document.addEventListener('fullscreenchange', function () {
    setTimeout(updateScale, 100);
  });

  // ===== BLACK SCREEN =====
  function toggleBlackScreen() {
    isBlackScreen = !isBlackScreen;
    document.body.classList.toggle('black-screen', isBlackScreen);
    if (presenterChannel) {
      presenterChannel.postMessage({
        type: 'black-screen',
        active: isBlackScreen
      });
    }
  }

  // ===== PRESENTER MODE =====
  let presenterChannel = null;

  try {
    presenterChannel = new BroadcastChannel('nextslide-presenter');
    presenterChannel.onmessage = function (event) {
      if (event.data.type === 'navigate') {
        goToSlide(event.data.slide);
      }
    };
  } catch (e) {
    // BroadcastChannel not supported
  }

  function syncPresenter() {
    if (!presenterChannel) return;
    presenterChannel.postMessage({
      type: 'slide-change',
      slide: currentSlide,
      total: totalSlides,
      notes: getNotesForSlide(currentSlide)
    });
  }

  function getNotesForSlide(n) {
    const slide = document.querySelector('[data-slide="' + n + '"]');
    if (!slide) return '';
    const notes = slide.querySelector('.notes');
    return notes ? notes.textContent.trim() : '';
  }

  function openPresenterWindow() {
    const title = document.title || 'Presentation';
    const presenterHTML = generatePresenterHTML(title);
    const pw = window.open('', 'nextslide-presenter',
      'width=1200,height=800,menubar=no,toolbar=no,location=no,status=no');
    if (!pw) {
      alert('Popup blocked. Allow popups and try again.');
      return;
    }
    pw.document.write(presenterHTML);
    pw.document.close();

    // Send initial state
    setTimeout(function () {
      if (presenterChannel) {
        presenterChannel.postMessage({
          type: 'init',
          slide: currentSlide,
          total: totalSlides,
          notes: getNotesForSlide(currentSlide)
        });
      }
    }, 500);
  }

  function generatePresenterHTML(title) {
    return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">' +
      '<title>Presenter — ' + title + '</title>' +
      '<style>' +
      '*{margin:0;padding:0;box-sizing:border-box}' +
      'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#1a1a2e;color:#e0e0e0;height:100vh;overflow:hidden}' +
      '.p-layout{display:grid;grid-template-columns:2fr 1fr;grid-template-rows:1fr auto;height:100vh;gap:12px;padding:12px}' +
      '.p-current{background:#000;border-radius:8px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}' +
      '.p-current-label,.p-next-label{position:absolute;top:8px;left:12px;font-size:11px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.1em}' +
      '.p-right{display:flex;flex-direction:column;gap:12px}' +
      '.p-next{background:#000;border-radius:8px;flex:0 0 180px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}' +
      '.p-notes{flex:1;background:#16213e;border-radius:8px;padding:16px;overflow-y:auto}' +
      '.p-notes h3{font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:rgba(255,255,255,.4);margin-bottom:12px}' +
      '.p-notes-content{font-size:18px;line-height:1.6;white-space:pre-wrap}' +
      '.p-bar{grid-column:1/-1;display:flex;justify-content:space-between;align-items:center;padding:8px 16px;background:#16213e;border-radius:8px}' +
      '.p-timer{font-size:32px;font-weight:700;font-variant-numeric:tabular-nums;color:#60a5fa}' +
      '.p-clock{font-size:16px;color:rgba(255,255,255,.4);margin-left:16px}' +
      '.p-counter{font-size:24px;font-weight:600;color:rgba(255,255,255,.6)}' +
      '.p-controls{display:flex;gap:8px}' +
      '.p-controls button{background:rgba(255,255,255,.1);border:none;color:#fff;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:14px}' +
      '.p-controls button:hover{background:rgba(255,255,255,.2)}' +
      '.p-slide-num{font-size:48px;font-weight:700;color:rgba(255,255,255,.15)}' +
      '</style></head><body>' +
      '<div class="p-layout">' +
      '<div class="p-current"><span class="p-current-label">Current Slide</span><span class="p-slide-num" id="p-cur-num">1</span></div>' +
      '<div class="p-right">' +
      '<div class="p-next"><span class="p-next-label">Next</span><span class="p-slide-num" id="p-next-num">2</span></div>' +
      '<div class="p-notes"><h3>Speaker Notes</h3><div class="p-notes-content" id="p-notes">No notes for this slide.</div></div>' +
      '</div>' +
      '<div class="p-bar">' +
      '<div><span class="p-timer" id="p-timer">00:00:00</span><span class="p-clock" id="p-clock"></span></div>' +
      '<span class="p-counter" id="p-counter">1 / 1</span>' +
      '<div class="p-controls">' +
      '<button id="p-reset">Reset Timer</button>' +
      '<button id="p-prev">← Prev</button>' +
      '<button id="p-next-btn">Next →</button>' +
      '</div></div></div>' +
      '<script>' +
      'var ch=new BroadcastChannel("nextslide-presenter");' +
      'var cur=1,tot=1,start=Date.now();' +
      'ch.onmessage=function(e){' +
      'if(e.data.type==="init"||e.data.type==="slide-change"){' +
      'cur=e.data.slide;tot=e.data.total;' +
      'document.getElementById("p-cur-num").textContent=cur;' +
      'document.getElementById("p-next-num").textContent=cur<tot?cur+1:"End";' +
      'document.getElementById("p-notes").textContent=e.data.notes||"No notes for this slide.";' +
      'document.getElementById("p-counter").textContent=cur+" / "+tot;' +
      '}};' +
      'document.getElementById("p-prev").onclick=function(){ch.postMessage({type:"navigate",slide:cur-1})};' +
      'document.getElementById("p-next-btn").onclick=function(){ch.postMessage({type:"navigate",slide:cur+1})};' +
      'document.getElementById("p-reset").onclick=function(){start=Date.now()};' +
      'function tick(){' +
      'var e=Date.now()-start,h=Math.floor(e/36e5),m=Math.floor(e%36e5/6e4),s=Math.floor(e%6e4/1e3);' +
      'document.getElementById("p-timer").textContent=' +
      'String(h).padStart(2,"0")+":"+String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");' +
      'var n=new Date;document.getElementById("p-clock").textContent=n.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});' +
      'requestAnimationFrame(tick)}tick();' +
      'document.addEventListener("keydown",function(e){' +
      'if(e.key==="ArrowRight"||e.key===" "){e.preventDefault();ch.postMessage({type:"navigate",slide:cur+1})}' +
      'if(e.key==="ArrowLeft"){e.preventDefault();ch.postMessage({type:"navigate",slide:cur-1})}' +
      '});' +
      '<\/script></body></html>';
  }

  // ===== INIT =====
  function init() {
    const startSlide = readHash();
    if (counterTotal) counterTotal.textContent = totalSlides;
    goToSlide(startSlide);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
```

---

## Layout HTML Examples

HTML snippets for each of the 13 layout types. Use these as templates when generating slides.

### 1. Title Layout

```html
<section class="slide" data-slide="1" data-layout="title">
  <div class="slide-content">
    <h1 class="animate-fade-up">Presentation Title</h1>
    <p class="subtitle animate-fade-up delay-200">A compelling subtitle that sets the stage</p>
    <p class="meta animate-fade-up delay-400">Author Name · March 2026</p>
  </div>
  <aside class="notes">Welcome everyone. Today I'll be presenting...</aside>
</section>
```

### 2. Section Layout

```html
<section class="slide" data-slide="4" data-layout="section">
  <div class="slide-content">
    <h1 class="animate-fade-up">Part Two</h1>
    <p class="subtitle animate-fade-up delay-200">Market Analysis & Findings</p>
  </div>
</section>
```

### 3. Content Layout

```html
<section class="slide" data-slide="5" data-layout="content">
  <div class="slide-content">
    <h1 class="animate-fade-up">Key Insight Headline</h1>
    <p class="animate-fade-up delay-200">
      Body text that supports and elaborates on the headline.
      Keep it concise — detailed explanations go in speaker notes.
    </p>
    <p class="animate-fade-up delay-300">
      A second paragraph if needed, but avoid going beyond two.
    </p>
  </div>
  <aside class="notes">Expand on this point with specific examples...</aside>
</section>
```

### 4. Two-Column Layout

```html
<section class="slide" data-slide="6" data-layout="two-column">
  <div class="slide-content">
    <h1 class="animate-fade-up">Before & After</h1>
    <div class="ns-columns">
      <div class="ns-col animate-fade-up delay-200">
        <h3>Before</h3>
        <p>Manual process taking 3 hours per task with frequent errors and rework cycles.</p>
      </div>
      <div class="ns-col animate-fade-up delay-400">
        <h3>After</h3>
        <p>Automated pipeline completing in 12 minutes with 99.7% accuracy rate.</p>
      </div>
    </div>
  </div>
</section>
```

### 5. Image-Left Layout

```html
<section class="slide" data-slide="7" data-layout="image-left">
  <div class="slide-content">
    <div class="ns-split">
      <div class="ns-split-image animate-fade-in">
        <img src="photo.jpg" alt="Description">
      </div>
      <div class="ns-split-text">
        <h1 class="animate-fade-up delay-200">Visual Impact</h1>
        <p class="animate-fade-up delay-400">
          Text content alongside the image that provides context and explanation.
        </p>
      </div>
    </div>
  </div>
</section>
```

### 6. Image-Right Layout

```html
<section class="slide" data-slide="8" data-layout="image-right">
  <div class="slide-content">
    <div class="ns-split">
      <div class="ns-split-text">
        <h1 class="animate-fade-up">Our Team</h1>
        <p class="animate-fade-up delay-200">
          Text on the left, image on the right.
        </p>
      </div>
      <div class="ns-split-image animate-fade-in delay-200">
        <img src="team.jpg" alt="Team photo">
      </div>
    </div>
  </div>
</section>
```

### 7. Image-Full Layout

```html
<section class="slide" data-slide="9" data-layout="image-full"
  style="background-image: url('hero.jpg')">
  <div class="slide-content">
    <h1 class="animate-fade-up">Bold Statement</h1>
    <p class="subtitle animate-fade-up delay-200">Text overlays on the gradient scrim</p>
  </div>
</section>
```

### 8. Chart Layout

```html
<section class="slide" data-slide="10" data-layout="chart">
  <div class="slide-content">
    <h1 class="animate-fade-up">Revenue Grew 40% Year-over-Year</h1>
    <div class="ns-chart-container animate-fade-up delay-200">
      <!-- Chart from interactive-elements.md -->
      <div class="ns-chart ns-chart-bar-h">
        <!-- bar chart HTML -->
      </div>
    </div>
  </div>
</section>
```

### 9. Quote Layout

```html
<section class="slide" data-slide="11" data-layout="quote">
  <div class="slide-content">
    <div class="ns-quote animate-fade-in duration-slow">
      <blockquote>The best way to predict the future is to invent it.</blockquote>
      <p class="ns-attribution animate-fade-up delay-400">— Alan Kay</p>
    </div>
  </div>
</section>
```

### 10. Bullets Layout

```html
<section class="slide" data-slide="12" data-layout="bullets">
  <div class="slide-content">
    <h1 class="animate-fade-up">Five Key Takeaways</h1>
    <ul class="ns-bullets">
      <li class="animate-fade-up delay-100">Market demand exceeds current supply by 3x</li>
      <li class="animate-fade-up delay-200">Customer acquisition cost dropped 40%</li>
      <li class="animate-fade-up delay-300">Net retention rate at 135%</li>
      <li class="animate-fade-up delay-400">Three new enterprise contracts signed</li>
      <li class="animate-fade-up delay-500">Runway extended to 24 months</li>
    </ul>
  </div>
</section>
```

### 11. Comparison Layout

```html
<section class="slide" data-slide="13" data-layout="comparison">
  <div class="slide-content">
    <h1 class="animate-fade-up">Traditional vs Modern</h1>
    <div class="ns-compare">
      <div class="ns-compare-card animate-scale-up delay-200">
        <h3>Traditional</h3>
        <p>Manual processes, siloed teams, quarterly releases, reactive support.</p>
      </div>
      <div class="ns-compare-card animate-scale-up delay-400">
        <h3>Modern</h3>
        <p>Automated pipelines, cross-functional squads, continuous deployment, proactive monitoring.</p>
      </div>
    </div>
  </div>
</section>
```

### 12. Timeline Layout

```html
<section class="slide" data-slide="14" data-layout="timeline">
  <div class="slide-content">
    <h1 class="animate-fade-up">Our Journey</h1>
    <div class="ns-timeline">
      <div class="ns-timeline-item animate-fade-left delay-100">
        <div class="ns-timeline-marker"></div>
        <div class="ns-timeline-content">
          <span class="ns-timeline-date">Jan 2024</span>
          <h4 class="ns-timeline-title">Founded</h4>
          <p class="ns-timeline-desc">Company incorporated, seed funding secured.</p>
        </div>
      </div>
      <div class="ns-timeline-item animate-fade-right delay-300">
        <div class="ns-timeline-marker"></div>
        <div class="ns-timeline-content">
          <span class="ns-timeline-date">Jun 2024</span>
          <h4 class="ns-timeline-title">Product Launch</h4>
          <p class="ns-timeline-desc">V1.0 released to public beta.</p>
        </div>
      </div>
      <div class="ns-timeline-item animate-fade-left delay-500">
        <div class="ns-timeline-marker active"></div>
        <div class="ns-timeline-content">
          <span class="ns-timeline-date">Mar 2025</span>
          <h4 class="ns-timeline-title">Series A</h4>
          <p class="ns-timeline-desc">$12M raised, team expanded to 30.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

### 13. Blank Layout

```html
<section class="slide" data-slide="15" data-layout="blank">
  <div class="slide-content">
    <!-- Freeform content — any custom HTML/CSS -->
    <div class="animate-fade-up" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
      <!-- Custom grid, bento layout, or any creative arrangement -->
    </div>
  </div>
</section>
```

---

## JSON Schema for PPTX Export

The `<script type="application/json" id="slide-data">` block enables PPTX export. Every visible element must have a corresponding JSON entry.

### Schema Structure

```json
{
  "meta": {
    "title": "Presentation Title",
    "author": "Author Name",
    "date": "2026-03-06",
    "theme": "corporate-pro",
    "slideWidth": 13.333,
    "slideHeight": 7.5
  },
  "slides": [
    {
      "layout": "title",
      "background": {
        "color": "#ffffff"
      },
      "elements": [
        {
          "type": "text",
          "content": "Presentation Title",
          "role": "title",
          "position": { "x": "10%", "y": "30%", "w": "80%", "h": "25%" },
          "style": {
            "fontSize": 44,
            "fontFace": "Sora",
            "bold": true,
            "italic": false,
            "color": "#1e293b",
            "align": "center",
            "valign": "middle"
          }
        }
      ],
      "notes": "Speaker notes text here"
    }
  ]
}
```

### Element Types

#### Text Element
```json
{
  "type": "text",
  "content": "The text content",
  "role": "title",
  "position": { "x": "10%", "y": "15%", "w": "80%", "h": "15%" },
  "style": {
    "fontSize": 44,
    "fontFace": "Sora",
    "bold": true,
    "italic": false,
    "color": "#1e293b",
    "align": "center",
    "valign": "middle"
  }
}
```

**Role values:** `title`, `subtitle`, `body`, `caption`, `label`, `footnote`

**Align values:** `left`, `center`, `right`

**Valign values:** `top`, `middle`, `bottom`

#### Image Element
```json
{
  "type": "image",
  "src": "https://example.com/photo.jpg",
  "alt": "Description",
  "position": { "x": "0%", "y": "0%", "w": "50%", "h": "100%" },
  "style": {
    "objectFit": "cover",
    "borderRadius": 8
  }
}
```

#### Shape Element
```json
{
  "type": "shape",
  "shape": "rect",
  "position": { "x": "5%", "y": "85%", "w": "90%", "h": "1%" },
  "style": {
    "fill": "#3b82f6",
    "borderRadius": 4
  }
}
```

**Shape values:** `rect`, `circle`, `line`

#### Chart Element
```json
{
  "type": "chart",
  "chartType": "bar",
  "data": [
    { "label": "Q1", "value": 2.4 },
    { "label": "Q2", "value": 3.1 },
    { "label": "Q3", "value": 2.8 },
    { "label": "Q4", "value": 3.6 }
  ],
  "position": { "x": "10%", "y": "25%", "w": "80%", "h": "60%" },
  "style": {
    "barColor": "#3b82f6",
    "labelColor": "#64748b"
  }
}
```

**Chart types:** `bar`, `bar-horizontal`, `donut`, `progress`

### Complete Example: Title + Content Slides

```json
{
  "meta": {
    "title": "Q3 Business Review",
    "author": "Jane Smith",
    "date": "2026-03-06",
    "theme": "corporate-pro",
    "slideWidth": 13.333,
    "slideHeight": 7.5
  },
  "slides": [
    {
      "layout": "title",
      "background": { "color": "#ffffff" },
      "elements": [
        {
          "type": "text",
          "content": "Q3 Business Review",
          "role": "title",
          "position": { "x": "10%", "y": "30%", "w": "80%", "h": "20%" },
          "style": { "fontSize": 44, "fontFace": "Sora", "bold": true, "color": "#1e293b", "align": "center" }
        },
        {
          "type": "text",
          "content": "Strategic Priorities & Financial Performance",
          "role": "subtitle",
          "position": { "x": "15%", "y": "55%", "w": "70%", "h": "10%" },
          "style": { "fontSize": 24, "fontFace": "Inter", "bold": false, "color": "#475569", "align": "center" }
        },
        {
          "type": "text",
          "content": "Jane Smith · March 2026",
          "role": "caption",
          "position": { "x": "20%", "y": "70%", "w": "60%", "h": "8%" },
          "style": { "fontSize": 18, "fontFace": "Inter", "bold": false, "color": "#94a3b8", "align": "center" }
        }
      ],
      "notes": "Welcome everyone to the Q3 review. I'll cover three main areas today."
    },
    {
      "layout": "content",
      "background": { "color": "#ffffff" },
      "elements": [
        {
          "type": "text",
          "content": "Revenue Exceeded Targets by 15%",
          "role": "title",
          "position": { "x": "5%", "y": "8%", "w": "90%", "h": "12%" },
          "style": { "fontSize": 40, "fontFace": "Sora", "bold": true, "color": "#1e293b", "align": "left" }
        },
        {
          "type": "text",
          "content": "Strong performance across all regions driven by enterprise deal acceleration and improved retention rates. APAC showed the highest growth at 42% year-over-year.",
          "role": "body",
          "position": { "x": "5%", "y": "25%", "w": "75%", "h": "30%" },
          "style": { "fontSize": 22, "fontFace": "Inter", "bold": false, "color": "#1e293b", "align": "left" }
        }
      ],
      "notes": "Highlight that APAC growth was driven by the Japan expansion."
    }
  ]
}
```

### JSON Rules

- Every visible text element on the slide → JSON entry with `type: "text"`
- Every image → JSON entry with `type: "image"` and `src` URL
- Every decorative shape/divider → JSON entry with `type: "shape"`
- Position values as percentages relative to slide dimensions
- Font sizes in **points** (not pixels) — approximate: `px * 0.75 = pt`
- Colors always in hex format (`#1e293b`)
- `fontFace` is the actual font name (e.g., `"Sora"`), not the CSS variable
- `role` field helps the PPTX exporter apply correct sizing and positioning
- `notes` at the slide level (not per-element) — maps to PPTX slide notes
