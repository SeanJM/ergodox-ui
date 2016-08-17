function Layer(opt) {
  var os = /Macintosh/.test(window.navigator.userAgent)
  ? 'mac'
  : 'win';

  var self = this;

  this.name = opt.name;
  this.keyList = [];
  this.selected = false;

  this.node = {
    document : el({ class : 'layer layer--' + os })
  };
}

Layer.prototype.keys = function (keys) {
  var self = this;

  _.forEach(keys, function (keyCode, i) {
    // Outside keys
    self.keyList[i] = el(Key, {
      keyCode : keyCode,

      onMousemove : function (e) {
        self.trigger('keyhover', e);
      },

      onClick : function (e) {
        if (self.selected) {
          self.selected.deselect();
        }
        e.target.select();
        self.selected = e.target;
        self.trigger('keyclick', e);
      }
    });

    self.keyList[i].addClass('key-' + i);
    self.node.document.append(self.keyList[i]);

    Layer.moveKey(self.keyList[i], self.keyList);
  });
};

Component.extend(Layer);
