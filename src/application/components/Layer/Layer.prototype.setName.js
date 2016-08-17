Layer.prototype.setName = function (value) {
  var previousValue = this.name;
  this.name = value;
  this.trigger('name', {
    value : value,
    previousValue : previousValue
  });
};
