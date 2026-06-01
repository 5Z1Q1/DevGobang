/**
 * CSS water ripple effect - GPU accelerated, smooth animation
 * Light blue / white palette
 */
(function () {
  const style = document.createElement('style');
  style.textContent = [
    '.wrp { position:fixed; pointer-events:none; z-index:9999; border-radius:50%;',
    '  border:2px solid rgba(135,206,250,.7);',
    '  background:radial-gradient(circle,rgba(173,216,250,.25) 0%,rgba(200,230,255,.08) 50%,transparent 70%);',
    '  animation:wrp-ripple .8s ease-out forwards; }',
    '@keyframes wrp-ripple {',
    '  0%   { width:0; height:0; opacity:1; transform:translate(-50%,-50%) scale(0); }',
    '  100% { width:200px; height:200px; opacity:0; transform:translate(-50%,-50%) scale(1); }',
    '}',
  ].join('\n');
  document.head.appendChild(style);

  document.addEventListener('click', function (e) {
    const el = document.createElement('div');
    el.className = 'wrp';
    el.style.left = e.clientX + 'px';
    el.style.top = e.clientY + 'px';
    document.body.appendChild(el);
    el.addEventListener('animationend', function () { el.remove(); });
  });
})();
