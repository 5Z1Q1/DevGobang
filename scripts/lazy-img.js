'use strict';
// ponytail: one regex over rendered HTML, adds loading=lazy + decoding=async to <img>
hexo.extend.filter('after_post_render', data => {
  data.content = (data.content || '').replace(
    /<img(?![^>]*\sloading=)/g,
    '<img loading="lazy" decoding="async"'
  );
  return data;
});
