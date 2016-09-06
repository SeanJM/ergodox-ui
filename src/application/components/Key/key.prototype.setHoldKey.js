Key.prototype.setHoldKey = function (key) {
  this.keyHold = key.keyHold;
  this.replaceWith(new Key({ code : this.valueOf() }));
  return this;
};
