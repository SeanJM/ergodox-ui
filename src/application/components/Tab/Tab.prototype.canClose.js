Tab.prototype.canClose = function () {
  var self = this;

  this.node.document.addClass('tab--close');

  this.node.document.append(
    this.node.close = el(Button,
      {
        class : 'tab_close',
        onClick : function () {
          self.trigger('tabClose');
        }
      }
    )
  );

  return this;
};
