// ─── Auth ──────────────────────────────────────────────────────────────

if (!sessionStorage.getItem('w101_auth')) {
  window.location.replace('/wrenching101-index');
}

// ─── Mettle Background ─────────────────────────────────────────────────

const MESH_DEFS = [
  { hex: '#00aac9', rMin: 0.55, rMax: 0.75, a0: 'dd' },
  { hex: '#016a7d', rMin: 0.20, rMax: 0.30, a0: '66' },
  { hex: '#00899e', rMin: 0.38, rMax: 0.52, a0: '99' },
  { hex: '#c45e1a', rMin: 0.50, rMax: 0.68, a0: 'cc' },
  { hex: '#d48728', rMin: 0.52, rMax: 0.70, a0: 'cc' },
  { hex: '#7c3a10', rMin: 0.18, rMax: 0.28, a0: '55' },
  { hex: '#fcba4b', rMin: 0.48, rMax: 0.65, a0: 'cc' },
  { hex: '#013d4a', rMin: 0.15, rMax: 0.25, a0: '44' },
];

function initNodes() {
  return MESH_DEFS.map(d => ({
    x: Math.random(), y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00025,
    vy: (Math.random() - 0.5) * 0.00025,
    hex: d.hex, a0: d.a0,
    r: d.rMin + Math.random() * (d.rMax - d.rMin),
  }));
}

function drawMesh(ctx, nodes, W, H) {
  ctx.fillStyle = '#011c24';
  ctx.fillRect(0, 0, W, H);
  nodes.forEach(n => {
    const cx = n.x * W, cy = n.y * H, r = n.r * Math.max(W, H);
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0,    n.hex + n.a0);
    g.addColorStop(0.55, n.hex + '55');
    g.addColorStop(1,    n.hex + '00');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  });
}

(function startBackground() {
  const bg    = document.getElementById('bg-canvas');
  const grain = document.getElementById('grain-canvas');
  if (!bg || !grain) return;

  const bgCtx    = bg.getContext('2d');
  const grainCtx = grain.getContext('2d');
  const DPR      = window.devicePixelRatio || 1;
  const nodes    = initNodes();
  let W, H, PW, PH, imgData, grainCount, frame = 0;

  function resize() {
    W = window.innerWidth; H = window.innerHeight;
    PW = Math.floor(W * DPR); PH = Math.floor(H * DPR);
    bg.width = W; bg.height = H;
    grain.width = PW; grain.height = PH;
    grain.style.width  = W + 'px';
    grain.style.height = H + 'px';
    imgData    = grainCtx.createImageData(PW, PH);
    grainCount = Math.floor(PW * PH * 0.02);
  }

  function tick() {
    frame++;
    if (frame % 2 === 0) {
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0.05 || n.x > 0.95) n.vx *= -1;
        if (n.y < 0.05 || n.y > 0.95) n.vy *= -1;
      });
      drawMesh(bgCtx, nodes, W, H);
    }
    if (frame % 3 === 0) {
      const d = imgData.data;
      d.fill(0);
      for (let i = 0; i < grainCount; i++) {
        const base = ((Math.random() * PH | 0) * PW + (Math.random() * PW | 0)) * 4;
        d[base] = 255; d[base + 1] = 225; d[base + 2] = 160; d[base + 3] = 90;
      }
      grainCtx.putImageData(imgData, 0, 0);
    }
    requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize);
  tick();
})();

// ─── Viewport Scaling ──────────────────────────────────────────────────

const viewport = document.querySelector('.slide-viewport');
const deckNavEl = document.querySelector('.deck-nav');

function scaleViewport() {
  const navH = deckNavEl ? deckNavEl.offsetHeight : 0;
  const scale = Math.min(window.innerWidth / 1920, (window.innerHeight - navH) / 1080);
  viewport.style.transform = 'scale(' + scale + ')';
}

window.addEventListener('resize', scaleViewport);
scaleViewport();

// ─── Navigation ────────────────────────────────────────────────────────

const slides    = Array.from(document.querySelectorAll('.slide'));
const btnHome   = document.getElementById('nav-home');
const btnPrev   = document.getElementById('nav-prev');
const btnNext   = document.getElementById('nav-next');
const navStrip  = document.getElementById('nav-strip');
const counterEl = document.getElementById('slide-counter-current');
const totalEl   = document.getElementById('slide-counter-total');

let current = 0;
const total = slides.length;

function goTo(index) {
  if (index < 0 || index >= total) return;
  slides[current].classList.remove('is-active');
  current = index;
  slides[current].classList.add('is-active');
  update();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

function update() {
  counterEl.textContent = String(current + 1).padStart(2, '0');
  totalEl.textContent   = String(total).padStart(2, '0');
  btnHome.classList.toggle('is-hidden', current === 0);
  btnPrev.classList.toggle('is-hidden', current === 0);
  btnNext.classList.toggle('is-hidden', current === total - 1);

  navStrip.querySelectorAll('.deck-nav__pip').forEach(function (pip, i) {
    pip.classList.toggle('is-active', i === current);
  });

  const isGeo = slides[current].classList.contains('slide--geometry');
  document.body.classList.toggle('is-geo', isGeo);
  if (isGeo) {
    applyGeoLayers(slides[current].dataset.geo);
  }
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
    e.preventDefault(); next();
  }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
    e.preventDefault(); prev();
  }
});

// ─── Touch / Swipe ─────────────────────────────────────────────────────

(function initSwipe() {
  var touchStartX = 0;
  var touchStartY = 0;

  document.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    var dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) { next(); } else { prev(); }
  }, { passive: true });
})();

btnHome.addEventListener('click', function () { goTo(0); });
btnPrev.addEventListener('click', prev);
btnNext.addEventListener('click', next);

for (let i = 0; i < total; i++) {
  const btn = document.createElement('button');
  btn.className = 'deck-nav__pip';
  btn.textContent = String(i + 1).padStart(2, '0');
  btn.setAttribute('aria-label', 'Slide ' + (i + 1));
  btn.addEventListener('click', (function (idx) {
    return function () { goTo(idx); };
  })(i));
  navStrip.appendChild(btn);
}

// ─── Geometry Diagram ──────────────────────────────────────────────────

const GEO_LAYERS = {
  Stack:       ['Stack-dim', 'EffTT-dotted'],
  Reach:       ['Reach-dim', 'Stack-dim'],
  ForkOffset:  ['forkoffset-dotted', 'HTangle-dotted'],
  Trail:       ['Trail-dim', 'wheelbase2-dotted', 'HTangle-dotted'],
  STangle:     ['seattubeangle', 'seattube-dotted', 'wheelbase-dotted'],
  HTangle:     ['HTangle-dim', 'HTangle-dotted', 'wheelbase-dotted'],
  HTLength:    ['HTlength-dim'],
  EffTT:       ['effectiveTT-dim', 'EffTT-dotted'],
  Chainstay:   ['Chainstay-dim'],
  Wheelbase:   ['Wheelbase-dim', 'wheelbase-dotted', 'wheelbase1-dotted', 'wheelbase2-dotted'],
  BBdrop:      ['BBdrop-dim', 'wheelbase-dotted'],
  FrontCenter: ['FrontCenter-dim'],
};

const ALL_GEO_IDS = Array.from(new Set(Object.values(GEO_LAYERS).flat()));

const GEO_BUTTONS = [
  'BBdrop-button', 'Chainstay-button', 'EffTT-button', 'ForkOffest-button',
  'FrontCenter-button', 'HTLength-button', 'HTangle-button', 'Reach-button',
  'STangle-button', 'Stack-button', 'Trail-button', 'Wheelbase-button',
];

const geoHost = document.getElementById('geo-host');

fetch('/diagrams/BikeGeo-chart.svg')
  .then(function (r) { return r.text(); })
  .then(function (svg) {
    geoHost.innerHTML = svg;

    // Hide all interactive button overlays — not needed in presentation
    GEO_BUTTONS.forEach(function (id) {
      const el = geoHost.querySelector('[id="' + id + '"]');
      if (el) el.style.display = 'none';
    });

    // Hide all dimension layers by default
    ALL_GEO_IDS.forEach(function (id) {
      const el = geoHost.querySelector('[id="' + id + '"]');
      if (el) el.style.opacity = '0';
    });

    // If the first slide is already a geo slide, apply its layers
    if (slides[current] && slides[current].classList.contains('slide--geometry')) {
      applyGeoLayers(slides[current].dataset.geo);
    }
  })
  .catch(function (err) {
    console.warn('Geo diagram failed to load:', err);
  });

function applyGeoLayers(key) {
  if (!geoHost.querySelector('svg')) return;

  // Reset all
  ALL_GEO_IDS.forEach(function (id) {
    const el = geoHost.querySelector('[id="' + id + '"]');
    if (el) el.style.opacity = '0';
  });

  // Show the layers for this dimension
  const layers = GEO_LAYERS[key] || [];
  layers.forEach(function (id) {
    const el = geoHost.querySelector('[id="' + id + '"]');
    if (el) el.style.opacity = '1';
  });
}

// ─── Init ──────────────────────────────────────────────────────────────

update();
