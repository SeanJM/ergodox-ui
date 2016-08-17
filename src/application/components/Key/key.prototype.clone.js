Key.prototype.clone = function () {
  return new Key({ keyCode : this.keyCode });
};
