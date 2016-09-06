function Layer(opt) {
  var self = this;

  this.name = opt.name;
  this.keyList = [];
  this.selected = false;

  this.node = {
    document : el({ class : 'layer' })
  };
}

Layer.prototype.keys = function (keys) {
  var self = this;

  keys.forEach(function (code, i) {
    // Outside keys
    self.keyList[i] = el(Key, {
      code : code,

      onMousemove : function (e) {
        self.trigger('keyhover', e);
      },

      onKeyClick : function (e) {
        if (self.selected) {
          self.selected.deselect();
        }
        e.target.select();
        self.selected = e.target;
        self.trigger('keyclick', e);
      },

      onKeyChange : function (e) {
        self.trigger('keyChange', e);
      }
    });

    self.keyList[i].addClass('key-' + i);
    self.node.document.append(self.keyList[i]);

    setDragKey({
      key : self.keyList[i],
      keyList : self.keyList,
      onDone : function () {}
    });
  });
};

Component.extend(Layer);
