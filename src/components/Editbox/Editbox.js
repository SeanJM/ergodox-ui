function Editbox(opt) {
  this.node = {
    document : el(Input)
  };

  this.node.document.append(
    el(Label, opt.label),
    this.node.input = el('input', { type : 'text' })
  );
}

Component.extend(Editbox);

Editbox.prototype.focus = function () {
  this.node.input.focus();
};

Editbox.prototype.validate = function (callback) {
  callback(this.node.input.value().length > 0);
};
