Key.prototype.setShift = function (key) {
  this.replaceWith(
    new Key({
      keyCode : 'LSFT(' + key.keyCode + ')'
    })
  );
  return this;
};
