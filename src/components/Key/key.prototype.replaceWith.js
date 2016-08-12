Key.prototype.replaceWith = function (key) {
  var keyClone = key.clone();
  var exclude = ['node', 'dropTarget'];

  _.assign(this, _.omit(keyClone, exclude));

  this.draw();

  return this;
};
