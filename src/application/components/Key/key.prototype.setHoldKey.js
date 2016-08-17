Key.prototype.setHoldKey = function (key) {
  this.keyHold = key.keyHold;
  this.is('isHoldLayerTapKey');
  this.replaceWith(new Key({ keyCode : this.valueOf() }));
  return this;
};
