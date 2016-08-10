Key.prototype.select = function () {
  this.node.document.addClass('key--select');
};

Key.prototype.deselect = function () {
  this.node.document.removeClass('key--select');
};
