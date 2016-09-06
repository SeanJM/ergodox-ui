Key.prototype.clear = function () {
  var clear = new Key({ code : KEYCODE.EMPTY });
  return this.replaceWith(clear);
};
