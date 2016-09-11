Key.prototype.clear = function () {
  var clear = new Key({ code : KEYCODE_EMPTY });
  return this.replaceWith(clear);
};
