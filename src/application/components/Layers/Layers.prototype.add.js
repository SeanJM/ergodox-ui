Layers.prototype.add = function (name, keys) {
  var self = this;

  this.elements.push(
    el(Layer, {
      name : name || false,
      keys : keys || LAYER_EMPTY[SETTINGS.KEYBOARD],

      onKeyhover : function (e) {
        self.trigger('keyHover', e);
      },

      onKeyClick : function (e) {
        self.trigger('keyClick', e);
      },

      onKeyChange : function (e) {
        self.setLockedKeys();
        self.trigger('keyChange', e);
      },

      onName : function (e) {
        self.rename(e);
      }
    })
  );
};
