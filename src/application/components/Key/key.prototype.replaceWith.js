Key.prototype.replaceWith = function (key) {
  var keyClone = key.clone();
  var exclude = ['node', 'dropTarget'];

  for (var k in keyClone) {
    if (keyClone.hasOwnProperty(k) && exclude.indexOf(k) === -1) {
      this[k] = keyClone[k];
    }
  }

  this.draw();

  return this;
};
