Key.prototype.iconSecondary = function (value) {
  if (this.node.cap.contains(this.node.iconSecondary)) {
    this.node.iconSecondary.text(value);
  } else {
    this.node.cap.append(
      this.node.iconSecondary = el(Icon,
        { class : 'key_icon key_icon-primary' },
        value
      )
    );
  }
};
