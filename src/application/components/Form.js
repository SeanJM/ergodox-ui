function Form() {
  this.elements = [];
  this.node = {
    document : el({ class : 'form' })
  };
}

Form.prototype.append = function () {
  var i = 0;
  var n = arguments.length;
  var self = this;

  function bottom(element) {
    function resize() {
      var formOffset = self.node.document.offset();
      var inputTop = element.node.document.offset().top;

      element.style('height',
        formOffset.height - element.bottom - (inputTop - formOffset.top) + 'px'
      );
    }

    element.on('mount', function () {
      resize();
      window.addEventListener('resize', _.debounce(resize, 25));
    });
  }

  for (; i < n; i++) {
    Component.prototype.append.call(this, arguments[i]);

    if (typeof arguments[i].bottom === 'number') {
      bottom(arguments[i]);
    }

    if (typeof arguments[i].validate === 'function') {
      this.elements.push(arguments[i]);
    }
  }
};

Form.prototype.focus = function () {
  this.elements[0].focus();
};

Component.extend(Form);
