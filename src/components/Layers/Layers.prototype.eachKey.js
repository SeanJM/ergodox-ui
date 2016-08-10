Layers.prototype.eachKey = function (cb) {
  for (var i = 0, n = this.elements.length; i < n; i++) {
    for (var x = 0, y = this.elements[i].keyList.length; x < y; x++) {
      cb(this.elements[i].keyList[x], x, this.elements[i].keys);
    }
  }
};
