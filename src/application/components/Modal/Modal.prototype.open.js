Modal.prototype.open = function () {
  var self = this;

  var contentHeight;
  var bodyHeight;
  var winHeight;

  this.style('opacity', 0);

  this.node.document.appendTo(document.body);
  this.node.control.focus();

  contentHeight = this.node.content.offset().height;
  bodyHeight = this.node.body.offset().height;
  winHeight = this.node.window.offset().height;

  this.node.content.style({
    paddingTop : (bodyHeight / 2) - (contentHeight / 2)
  });

  this.node.document.fadeIn(1000);

  anime({
    targets : this.node.window.node,
    top : [winHeight * -1.2, 0],
    delay : 300,
    duration : 600,
    elasticity : 100,
    ease : 'easeInQuart'
  });

  document.body.addEventListener('keydown', this.cancelListener = function (e) {
    if (e.which === KEYCODE_ESC) {
      if (self.node.control.cancel) {
        self.node.control.cancel.trigger('click');
      }
      self.close();
    }
  });
};
