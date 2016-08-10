Tabs.prototype.select = function (index) {
  index = index > -1
    ? this.elements[index]
      ? index
      : 0
    : this.elements.length - 1;
  this.elements[index].select();
};
