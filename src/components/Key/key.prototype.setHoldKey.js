Key.prototype.setHoldKey = function (key) {
  this.keyHold = key.keyCode;
  this.replaceWith(new Key({ keyCode : this.valueOf() }));
  return this;
};
