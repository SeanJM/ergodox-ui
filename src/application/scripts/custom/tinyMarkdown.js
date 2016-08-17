function tinyMarkdown(s) {
  return s.replace(/\*\*([^\*]+)\*\*/, function (a, b) {
    return '<em>' + b + '</em>';
  })
  .replace(/\*([^\*]+)\*/, function (a, b) {
    return '<ul>' + b + '</ul>';
  })
  .replace(/\n/g, '<br><br>');
}
