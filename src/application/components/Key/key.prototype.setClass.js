(function () {
  var CLEAR_CLASSES = [
    'key--modified',
    'key--hold-key-tap-key',
    'key--hold-layer-tap-key',
    'key--layer-toggle',
    'key--macro',
    'key--locked',
    'key--transparent',
    'key--default',
  ];

  Key.prototype.setClass = function () {
    var self = this;

    self.node.document.removeClass(CLEAR_CLASSES);

    if (this.isModifiedKey) {
      this.node.document.addClass('key--modified');
    } else if (this.isHoldModifierTapKey) {
      this.node.document.addClass('key--hold-key-tap-key');
    } else if (this.isHoldLayerTapKey) {
      this.node.document.addClass('key--hold-layer-tap-key');
    } else if (this.isLayerToggle) {
      this.node.document.addClass('key--layer-toggle');
    } else if (this.isMacro) {
      this.node.document.addClass('key--macro');
    } else {
      this.node.document.addClass('key--default');
    }

    if (this.isTransparent) {
      this.node.document.addClass('key--transparent');
    }
  };
}());
