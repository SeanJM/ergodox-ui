// When a layer is renamed, rename all string references to the previous name
// and redraw that key
Layers.prototype.rename = function (e) {
  this.eachKey(function (key) {
    if (
      key.isLayerToggle
      && typeof key.keyTap === 'string'
      && typeof e.previousValue === 'string'
      && key.keyTap === e.previousValue
    ) {
      key.keyTap = e.value;
      key.codeObject(key.valueOf());
      key.draw();
    } else if (
      key.isHoldLayerTapKey
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
