Key.prototype.lightOn = function () {
  this.node.document.addClass('key--hilight');
};

Key.prototype.lightOff = function () {
  this.node.document.removeClass('key--hilight');
};
