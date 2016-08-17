Key.prototype.clear = function () {
  var clear = new Key({ keyCode : KEYCODE.EMPTY });
  return this.replaceWith(clear);
};
