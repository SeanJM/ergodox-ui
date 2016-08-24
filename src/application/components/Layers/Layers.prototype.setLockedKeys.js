Layers.prototype.setLockedKeys = function () {
  var self = this;

  function maybeLock(key, keyIndex) {
    // The key may need to be locked
    var target;
    if (key.isLayerSignal) {
      target = [
        self.find(key.str_primary),
        self.find(key.str_secondary)
      ];
      if (target[0]) {
        target[0].keyList[keyIndex].setParent(key);
      } else if (target[1]) {
        target[1].keyList[keyIndex].setParent(key);
      }
    }
  }

  function maybeUnlock(key, keyIndex) {
    var sameIndex = self.elements
      .map(a => a.keyList[keyIndex])
      .filter(a => a !== key && a.isLayerSignal);
    if (!sameIndex.length) {
      key.clear();
    }
  }

  // Connect toggle keys to their sibling & layers to keys
  this.elements.forEach(function (layer) {
    layer.keyList.forEach(function (key, keyIndex) {
      if (!key.isEmpty) {
        maybeLock(key, keyIndex);
      } else if (key.isLocked) {
        maybeUnlock(key, keyIndex);
      }
    });
  });
};
