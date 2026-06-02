/**
 * 代码块语法高亮 - 适配 Butterfly 主题表格结构
 * 使用 highlight.js 对代码块逐行着色，保留行号结构
 */
(function () {
  'use strict';

  if (typeof hljs === 'undefined') return;

  function highlightCodeBlocks() {
    var figures = document.querySelectorAll('figure.highlight');
    figures.forEach(function (figure) {
      // 从 class 中提取语言（如 "highlight bash" → "bash"）
      var lang = '';
      var classes = figure.className.split(/\s+/);
      for (var i = 0; i < classes.length; i++) {
        if (classes[i] !== 'highlight' && classes[i] !== 'hljs') {
          lang = classes[i];
          break;
        }
      }

      // 获取所有 .code 下的 .line span
      var lines = figure.querySelectorAll('.code .line');
      if (lines.length === 0) {
        // 无行号结构：直接找 code 中的 pre
        var codePre = figure.querySelector('.code pre');
        if (codePre) {
          var raw = codePre.textContent;
          var result = lang
            ? hljs.highlight(raw, { language: lang, ignoreIllegals: true })
            : hljs.highlightAuto(raw);
          codePre.innerHTML = result.value;
        }
        return;
      }

      // 有行号结构：逐行着色
      lines.forEach(function (span) {
        var text = span.textContent;
        var result = lang
          ? hljs.highlight(text, { language: lang, ignoreIllegals: true })
          : hljs.highlightAuto(text);
        span.innerHTML = result.value;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', highlightCodeBlocks);
  } else {
    highlightCodeBlocks();
  }
})();
