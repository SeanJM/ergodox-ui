Layers.prototype.load = function (layers) {
  var self = this;

  this.node.document.text('');

  _.forEach(layers, function (layer) {
    self.add(layer.name, layer.keys);
  });

  this.setLockedKeys();
};
