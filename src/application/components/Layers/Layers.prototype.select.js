Layers.prototype.select = function (layer) {
  this.node.document.text('');
  this.node.document.append(this.elements[layer]);
};
