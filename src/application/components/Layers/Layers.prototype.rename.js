// When a layer is renamed, rename all string references to the previous name
// and redraw that key
Layers.prototype.rename = function (e) {
  this.eachKey(function (key) {
    if (key.isLayerToggle && !key.isEmpty && key.keyHold === e.previousValue) {
      key.keyHold = e.value;
      key.codeObject(key.valueOf());
      key.draw();
    } else if (key.isHoldLayerTapKey && key.keyHold === e.previousValue) {
      key.keyHold = e.value;
      key.codeObject(key.valueOf());
      key.draw();
    }
  });
  this.setLockedKeys();
};
