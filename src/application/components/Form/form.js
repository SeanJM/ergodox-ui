function Form() {
  this.elements = [];
  this.node = {
    document : el({ class : 'form' })
  };
}

Form.prototype.append = function () {
  var i = 0;
  var n = arguments.length;
  for (; i < n; i++) {
    this.node.document.append(arguments[i]);
    if (typeof arguments[i].validate === 'function') {
      this.elements.push(arguments[i]);
    }
  }
};

Form.prototype.focus = function () {
  this.elements[0].focus();
};

Component.extend(Form);
