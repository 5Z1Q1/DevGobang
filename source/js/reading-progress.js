/**
 * 阅读进度条 + 页脚运行时间计数器
 */
(function () {
  // --- 阅读进度条 ---
  var bar = document.createElement('div');
  bar.id = 'reading-progress-bar';
  document.body.prepend(bar);

  function updateProgress() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight <= 0) return;
    var progress = Math.min((scrollTop / scrollHeight) * 100, 100);
    bar.style.width = progress + '%';
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateProgress();

  // --- 页脚运行时间 ---
  var blogStart = new Date('2025-09-04');
  var footerEl = document.querySelector('#footer .copyright');
  if (footerEl) {
    var span = document.createElement('span');
    span.id = 'footer-runtime';
    span.textContent = calcDays();
    footerEl.appendChild(document.createTextNode(' ｜ 已运行 '));
    footerEl.appendChild(span);

    function calcDays() {
      var now = new Date();
      var diff = Math.floor((now - blogStart) / (1000 * 60 * 60 * 24));
      var years = Math.floor(diff / 365);
      var days = diff % 365;
      if (years > 0) {
        return years + ' 年 ' + days + ' 天';
      }
      return days + ' 天';
    }
  }
})();
