App.prototype.bindLayers = function () {
  var self = this;

  this.node.layers.on('keyHover', function (e) {
    self.node.status.value(e.target);
  });

  this.node.layers.on('keyClick', function (e) {
    var width = self.node.letterBox.offset().width;
    if (!self.node.letterBox.isOpen) {
      self.node.letterBox.open();

      anime({
        duration : 600,
        targets : self.node.workspace.node,
        right : [ 0, width ],
        easing : 'easeOutExpo'
      });
    }
  });
};
