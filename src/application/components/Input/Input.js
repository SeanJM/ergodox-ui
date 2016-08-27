function Input() {
  this.node = {
    document : el({ class : 'input' })
  };
}

Input.prototype.append = function (a) {
  var i = 0;
  var n = arguments.length;

  for (; i < n; i++) {
    if (arguments[i] instanceof Icon) {
      this.node.document.addClass('input--icon');
    }
    Component.prototype.append.call(this, arguments[i]);
  }
};

Component.extend(Input);
