/**
 * Custom fireworks with One Half Dark color palette
 * Click anywhere to trigger fireworks
 */
(function () {
  const colors = ['#e06c75', '#98c379', '#e5c07b', '#61afef', '#c678dd', '#56b6c2', '#dcdfe4'];

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:9999;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function random(min, max) { return Math.random() * (max - min) + min; }

  function explode(x, y) {
    const count = 24;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + random(-0.3, 0.3);
      const speed = random(2, 7);
      const size = random(1.5, 3.5);
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x, y, color, size,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: random(0.012, 0.028),
      });
    }
  }

  document.addEventListener('click', function (e) {
    explode(e.clientX, e.clientY);
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);
    particles = particles.filter(function (p) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06;
      p.life -= p.decay;
      if (p.life <= 0) return false;
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return true;
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
