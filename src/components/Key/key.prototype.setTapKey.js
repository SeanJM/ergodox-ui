Key.prototype.setTapKey = function (key) {
  this.keyTap = key.keyCode;
  this.replaceWith(new Key({ keyCode : this.valueOf() }));
  return this;
};
