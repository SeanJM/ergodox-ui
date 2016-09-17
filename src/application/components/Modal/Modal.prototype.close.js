Modal.prototype.close = function () {
  document.body.removeEventListener('keydown', this.cancelListener);
  this.node.document.remove();
};
