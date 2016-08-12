Key.prototype.clear = function () {
  var clear = new Key({ keyCode : 'KC_TRNS' });
  return this.replaceWith(clear);
};
