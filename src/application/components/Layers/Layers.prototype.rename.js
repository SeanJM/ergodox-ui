// When a layer is renamed, rename all string references to the previous name
// and redraw that key
Layers.prototype.rename = function (e) {
  this.eachKey(function (key) {
    if (
      key.isLayerSignal
      && !key.isEmpty
      && typeof key.keyHold === 'string'
      && typeof e.previousValue === 'string'
      && key.keyHold === e.previousValue
    ) {
      key.keyHold = e.value;
      key.codeObject(key.valueOf());
      key.draw();
    }
  });
  this.setLockedKeys();
};
