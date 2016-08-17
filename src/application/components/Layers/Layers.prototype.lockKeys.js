Layers.prototype.lockKeys = function () {
  var self = this;

  // Connect toggle keys to their sibling & layers to keys
  _.forEach(this.elements, function (layer) {
    var notLayers = _.filter(self.elements, a => a.name !== layer.name);
    _.forEach(layer.keyList, function (key, i) {
      if (!key.isEmpty && (key.isLayerToggle || key.isMomentLayer)) {
        _.forEach(notLayers, function (notLayer) {
          if (key.str_primary === notLayer.name) {
            notLayer.keyList[i].setParent(key);
          }
        });
      }
    });
  });
};
