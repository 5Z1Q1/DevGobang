/**
 * Water ripple effect on click
 * Light blue / white color palette
 */
(function () {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let ripples = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('click', function (e) {
    for (let i = 0; i < 3; i++) {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 60 + i * 30,
        life: 1,
        delay: i * 120,
      });
    }
  });

  function draw(timestamp) {
    ctx.clearRect(0, 0, w, h);
    ripples = ripples.filter(function (r) {
      if (r.delay > 0) {
        r.delay -= 16;
        return true;
      }
      r.radius += 1.2;
      r.life = 1 - r.radius / r.maxRadius;
      if (r.life <= 0) return false;

      ctx.save();
      ctx.globalAlpha = r.life * 0.6;
      ctx.strokeStyle = 'rgba(135, 206, 235, ' + (r.life * 0.8) + ')';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(173, 216, 230, 0.5)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      return true;
    });
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();
