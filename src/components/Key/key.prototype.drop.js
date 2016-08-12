Key.prototype.drop = function (coordinates) {
  var context = el(ContextMenu);
  var self = this;

  if (this.dropTarget.isTransparent) {
    this.dropTarget.replaceWith(this);
    this.clear();
  } else {
    context.on('close', function () {
      key.dropTarget.lightOff();
    });

    context.append(
      el({
        onClick : function () {
          self.dropTarget.replaceWith(self);
          self.clear();
        }
      }, 'Replace'),
      el({
        onClick : function () {
          self.dropTarget.replaceWith(self);
        }
      }, 'Replace and Copy')
    );
    if (this.dropTarget.isHoldLayerTapKey) {
      context.append(
        el('hr'),
        el({
          onClick : function () {
            self.dropTarget.setTapKey(self);
          }
        }, 'Replace tap key')
      );
    }
    context.open(coordinates);
  }
};
