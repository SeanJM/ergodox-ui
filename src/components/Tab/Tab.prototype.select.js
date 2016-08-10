Tab.prototype.select = function () {
  this.node.document.addClass('tab--select');
  this.trigger('tabSelect');
};

Tab.prototype.deselect = function () {
  this.node.document.removeClass('tab--select');
  this.editCancel();
};
