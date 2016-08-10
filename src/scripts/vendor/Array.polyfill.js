if (typeof [].contains === 'undefined') {
  Array.prototype.contains = function (a) {
    return this.indexOf(a) > -1;
  };
}
