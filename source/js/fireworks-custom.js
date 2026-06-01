/**
 * Realistic 3D water ripple effect
 * Multi-ring with gradation, central bloom, and depth simulation
 */
(function () {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const ripples = [];

  document.addEventListener('click', function (e) {
    ripples.push({ x: e.clientX, y: e.clientY, t: 0 });
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.t += 1;

      if (r.t > 100) { ripples.splice(i, 1); continue; }

      const progress = r.t / 100; // 0→1

      for (let ring = 0; ring < 5; ring++) {
        const offset = ring * 12;
        const ringProgress = Math.max(0, (r.t - offset) / (100 - offset));
        if (ringProgress <= 0 || ringProgress >= 1) continue;

        const radius = ringProgress * 120;
        const alpha = (1 - ringProgress) * (0.7 - ring * 0.1);

        // Outer ring - deeper blue
        const grad = ctx.createRadialGradient(r.x, r.y, radius * 0.7, r.x, r.y, radius);
        grad.addColorStop(0, 'rgba(255,255,255,0)');
        grad.addColorStop(0.5, 'rgba(180,215,255,' + (alpha * 0.5) + ')');
        grad.addColorStop(0.8, 'rgba(100,180,240,' + (alpha * 0.6) + ')');
        grad.addColorStop(1, 'rgba(60,150,220,' + (alpha * 0.3) + ')');

        ctx.save();
        ctx.globalAlpha = 1;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.5 - ring * 0.3;
        ctx.shadowColor = 'rgba(140,200,255,0.4)';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // Central bloom - bright white glow that fades quickly
      if (r.t < 20) {
        const bloomAlpha = (1 - r.t / 20) * 0.6;
        const bg = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, 30);
        bg.addColorStop(0, 'rgba(255,255,255,' + bloomAlpha + ')');
        bg.addColorStop(0.3, 'rgba(220,240,255,' + (bloomAlpha * 0.7) + ')');
        bg.addColorStop(0.7, 'rgba(173,216,250,' + (bloomAlpha * 0.3) + ')');
        bg.addColorStop(1, 'rgba(135,206,235,0)');

        ctx.save();
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
