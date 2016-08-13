Key.prototype.setShift = function (key) {
  this.is('isModifiedKey');
  this.replaceWith(new Key({ keyCode : 'LSFT(' + key.keyCode + ')'}));
  return this;
};
