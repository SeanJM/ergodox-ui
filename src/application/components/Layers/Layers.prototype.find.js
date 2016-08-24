Layers.prototype.find = function (name) {
  return this.elements.filter(a => a.name === name)[0];
};
