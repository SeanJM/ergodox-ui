function Input() {
  var self = this;

  this.node = {
    document : el({ class : 'input' })
  };

  this.on('focus', function () {
    self.node.document.addClass('input--active');
  });

  this.on('blur', function () {
    self.node.document.removeClass('input--active');
  });
}

Input.prototype.append = function () {
  var i = 0;
  var n = arguments.length;
  var self = this;

  function trigger(e) {
    self.trigger(e.type);
  }

  for (; i < n; i++) {
    if (arguments[i] instanceof Icon) {
      this.node.document.addClass('input--icon');
    } else {
      this.node.input = arguments[i];
      this.node.input.on('focus, blur', trigger);
    }

    Component.prototype.append.call(this, arguments[i]);
  }
};

Input.prototype.offset = function () {
  return this.node.document.offset();
};

Input.prototype.focus = function () {
  this.node.input.focus();
};

Component.extend(Input);
