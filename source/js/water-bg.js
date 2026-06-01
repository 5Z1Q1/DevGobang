/**
 * Dynamic water ripple background
 * Subtle wave lines with light blue palette, sits behind all content
 */
(function () {
  const cvs = document.createElement('canvas');
  cvs.style.cssText = 'position:fixed;top:0;left:0;z-index:-1;';
  document.body.prepend(cvs);
  const ctx = cvs.getContext('2d');
  let w, h, t = 0;

  function resize() {
    w = cvs.width = window.innerWidth;
    h = cvs.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    t += 0.008;
    ctx.clearRect(0, 0, w, h);

    // Draw horizontal wave bands
    for (let row = 0; row < 6; row++) {
      const baseY = (h / 6) * (row + 0.5);
      ctx.save();
      ctx.globalAlpha = 0.18;

      for (let x = 0; x < w; x += 1) {
        const y = baseY + Math.sin(x * 0.008 + t + row * 1.2) * 30
                      + Math.cos(x * 0.015 - t * 0.7 + row) * 15;

        // Gradient color along the wave
        const r = 200 + Math.sin(x * 0.01 + row) * 30;
        const g = 220 + Math.cos(x * 0.012 + row) * 20;
        const b = 250 - row * 8;
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',0.035)';
        ctx.fillRect(x, y, 2, 1.2);
      }
      ctx.restore();
    }

    requestAnimationFrame(draw);
  }
  draw();
})();
