function Label(opt) {
  this.node = {
    document : el('label', opt
      ? opt.value
      : ''
    )
  };
}

Component.extend(Label);

Label.prototype.text = function (text) {
  this.node.document.text(text);
};
