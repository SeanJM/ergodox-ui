Key.prototype.setParent = function (key) {
  var omit = [ 'node', 'code', 'style', '_subscriber_' ];

  Object.assign(this, _.omit(key, omit));

  this.isLocked = true;
  this.isEmpty = true;
  
  this.draw();
};
