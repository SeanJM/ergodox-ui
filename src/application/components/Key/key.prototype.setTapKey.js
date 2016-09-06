Key.prototype.setTapKey = function (key) {
  this.keyTap = key.code;
  this.replaceWith(new Key({ code : this.valueOf() }));
  return this;
};
