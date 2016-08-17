Layers.prototype.add = function (name, keys) {
  var self = this;

  this.elements.push(
    el(Layer, {
      name : name || false,
      keys : keys || EMPTY.ergodox,
      onKeyhover : function (e) {
        self.trigger('keyhover', e);
      },
      onName : function (e) {
        self.rename(e);
      }
    })
  );
};
