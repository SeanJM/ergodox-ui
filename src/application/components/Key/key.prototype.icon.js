Key.prototype.icon = function (value) {
  if (!value) {
    this.node.icon.remove();
    this.node.icon.trigger('clear');
  } else if (this.node.cap.contains(this.node.icon)) {
    this.node.icon.text(value);
  } else {
    this.node.icon.text(value);
    this.node.cap.append(this.node.icon);
    this.node.icon.trigger('insert');
  }
};
