Modal.prototype.append = function () {
  var i = 0;
  var n = arguments.length;

  for (; i < n; i++) {
    if (arguments[i] instanceof Control) {
      this.node.feet.append(arguments[i]);
    } else {
      this.node.body.append(arguments[i]);
    }
  }
};
