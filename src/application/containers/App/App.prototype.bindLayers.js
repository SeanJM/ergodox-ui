App.prototype.bindLayers = function () {
  var self = this;

  this.node.layers.on('keyHover', function (e) {
    self.node.status.value(e.target);
  });

  this.node.layers.on('keyClick', function (e) {
  });
};
