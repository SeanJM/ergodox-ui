App.prototype.bindLayers = function () {
  var self = this;

  this.node.layers.on('keyHover', function (e) {
    self.node.status.value(e.target);
  });

  this.node.letterBox.on('open', function () {
    var width = self.node.letterBox.offset().width;

    anime({
      duration : 600,
      targets : self.node.workspace.node,
      right : [ 0, width ],
      easing : 'easeOutExpo'
    });
  });

  this.node.letterBox.on('close', function () {
    var width = self.node.letterBox.offset().width;

    anime({
      duration : 600,
      targets : self.node.workspace.node,
      right : [ 0 ],
      easing : 'easeOutExpo'
    });
  });

  this.node.layers.on('keyClick', function (e) {
  });
};
