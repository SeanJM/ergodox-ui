Modal.prototype.text = function (v) {
  var node = el('p', { class : 'modal_text' });

  node.html(tinyMarkdown(v));

  this.node.content.append(node);
};
