// ─── Background ───────────────────────────────────────────────────────

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
  let W, H, PW, PH, imgData, grainCount, frame = 0, raf;

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
    raf = requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener('resize', resize);
  tick();
})();

// ─── Gate Logic ────────────────────────────────────────────────────────

const PASS = 'M3ttle@sfuck!';
const KEY  = 'w101_auth';

if (sessionStorage.getItem(KEY)) {
  window.location.replace('slides.html');
}

const form  = document.getElementById('gate-form');
const input = document.getElementById('gate-input');
const error = document.getElementById('gate-error');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (input.value === PASS) {
    sessionStorage.setItem(KEY, '1');
    window.location.replace('slides.html');
  } else {
    error.textContent = 'Incorrect code. Try again.';
    input.value = '';
    input.focus();
  }
});
