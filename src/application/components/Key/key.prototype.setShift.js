Key.prototype.setShift = function (key) {
  this.replaceWith(
    new Key({
      code : 'LSFT(' + key.code + ')'
    })
  );
  return this;
};
