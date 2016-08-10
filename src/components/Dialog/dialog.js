function Dialog() {
  this.node = {
    document : el('div', { class : 'dialog' })
  };

  this.node.document.append(
    this.node.head = el('div', { class : 'dialog_head' }),
    this.node.body = el('div', { class : 'dialog_body' }),
    this.node.feet = el('div', { class : 'dialog_feet' })
  );
}

Component.extend(Dialog);

Dialog.prototype.append = function () {
  var i = 0;
  var n = arguments.length;

  function onOpen(f) {
    return function () {
      f.focus();
    };
  }

  for (; i < n; i++) {
    if (arguments[i] instanceof Form) {
      this.node.body.append(arguments[i]);
      this.on('open', onOpen(arguments[i]));
    } else if (arguments[i] instanceof Control) {
      this.node.feet.append(arguments[i]);
    } else if (arguments[i] instanceof Title) {
      this.node.head.append(arguments[i]);
    }
  }
};

Dialog.prototype.open = function () {
  this.node.document.appendTo(document.body);
  this.node.document.style.top = (
    (window.innerHeight / 2) - (this.node.document.offset().height / 2)
  ) + 'px';
  this.trigger('open');
};
