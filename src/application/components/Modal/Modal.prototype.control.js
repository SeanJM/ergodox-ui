Modal.prototype.control = function () {
  var self = this;
  var n = arguments.length;
  var i = 0;

  function close() {
    self.close();
  }

  for (; i < n; i++) {
    arguments[i].addClass('modal_button');
    this.node.control.append(arguments[i]);
    if (
      arguments[i] instanceof Button.Confirm
      || arguments[i] instanceof Button.Cancel
    ) {
      arguments[i].on('click', close);
    }
  }
};
