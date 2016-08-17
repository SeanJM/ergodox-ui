function Control() {
  var self = this;

  this.node = {
    document : el({ class : 'control' })
  };

  this.on('cancel', function () {
    self.node.cancel.trigger('click');
  });

  this.on('confirm', function () {
    self.node.confirm.trigger('click');
  });
}

Component.extend(Control);

Control.prototype.focus = function () {
  this.elements[0].focus();
};

Control.prototype.append = function () {
  var i = 0;
  var n = arguments.length;

  for (; i < n; i++) {
    if (arguments[i].isCancel) {
      this.node.cancel = arguments[i];
    } else if (arguments[i].isConfirm) {
      this.node.confirm = arguments[i];
    }

    Component.prototype.append.call(this, arguments[i]);
  }
};
