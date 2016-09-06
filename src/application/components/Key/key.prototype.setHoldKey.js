Key.prototype.setHoldKey = function (key) {
  this.keyHold = key.keyHold;
  this.replaceWith(new Key({ keyCode : this.valueOf() }));
  return this;
};
