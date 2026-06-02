/**
 * 自动在中英文/数字之间插入空格（盘古之白）
 * 仅在页面加载后对文本节点处理，不修改代码块等元素
 */
(function () {
  'use strict';

  // CJK 字符范围：中文、日文假名、韩文
  var CJK = '[一-鿿㐀-䶿豈-﫿぀-ゟ゠-ヿ가-힯]';
  var LATIN = '[A-Za-zÀ-ɏ]';
  var DIGIT = '[0-9]';

  // 匹配：CJK后接英文/数字，或英文/数字后接CJK
  var RE_CJK_LATIN = new RegExp('(' + CJK + ')(' + LATIN + '|' + DIGIT + ')', 'g');
  var RE_LATIN_CJK = new RegExp('(' + LATIN + '|' + DIGIT + ')(' + CJK + ')', 'g');

  // 不应处理的元素
  var SKIP_TAGS = ['PRE', 'CODE', 'SCRIPT', 'STYLE', 'TEXTAREA', 'KBD', 'NOSCRIPT'];

  function shouldSkip(node) {
    var parent = node.parentNode;
    while (parent) {
      if (parent.nodeType === 1 && SKIP_TAGS.indexOf(parent.tagName) > -1) {
        return true;
      }
      parent = parent.parentNode;
    }
    return false;
  }

  function addSpacing(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    for (var i = 0; i < textNodes.length; i++) {
      var node = textNodes[i];
      if (shouldSkip(node)) continue;

      var text = node.textContent;
      // 如果已经正确处理过（包含合理的 CJK-Latin 空格），跳过
      var newText = text.replace(RE_CJK_LATIN, '$1 $2').replace(RE_LATIN_CJK, '$1 $2');
      if (newText !== text) {
        node.textContent = newText;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      addSpacing(document.body);
    });
  } else {
    addSpacing(document.body);
  }
})();
