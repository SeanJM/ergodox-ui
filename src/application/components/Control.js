function Control() {
  this.node = { document : el({ class : 'control' }) };
}

Control.prototype.focus = function () {
  this.elements[0].focus();
};

Control.prototype.append = function () {
  var i = 0;
  var n = arguments.length;
  var self = this;

  function cancel(e) {
    self.trigger('cancel', e);
  }

  function confirm(e) {
    self.trigger('confirm', e);
  }

  for (; i < n; i++) {
    if (arguments[i].isCancel) {
      arguments[i].on('cancel', cancel);
    } else if (arguments[i].isConfirm) {
      arguments[i].on('confirm', confirm);
    }
    Component.prototype.append.call(this, arguments[i]);
  }
};

Component.extend(Control);
