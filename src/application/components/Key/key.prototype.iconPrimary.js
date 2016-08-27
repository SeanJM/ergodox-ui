Key.prototype.iconPrimary = function (value) {
  if (this.node.cap.contains(this.node.iconPrimary)) {
    this.node.iconPrimary.text(value);
  } else {
    this.node.cap.append(
      this.node.iconPrimary = el(Icon,
        { class : 'key_icon key_icon-primary' },
        value
      )
    );
  }
};
