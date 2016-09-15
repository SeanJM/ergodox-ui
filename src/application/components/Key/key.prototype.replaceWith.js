Key.prototype.replaceWith = function (key) {
  var clone = key.clone();
  var exclude = [ 'node', 'dropTarget', 'subscriber' ];

  for (var k in this) {
    if (this.hasOwnProperty(k) && exclude.indexOf(k) === -1) {
      this[k] = undefined;
    }
  }

  for (k in clone) {
    if (clone.hasOwnProperty(k) && exclude.indexOf(k) === -1) {
      this[k] = clone[k];
    }
  }

  Key.prototype.draw.call(this);
  Component.prototype.trigger.call(this, 'keyChange');

  return this;
};
