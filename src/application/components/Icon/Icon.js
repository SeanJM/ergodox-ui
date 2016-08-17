function Icon() {
  this.img = false;
  this.node = {
    document : el({ class : 'icon' })
  };
}

Icon.prototype.set = function (str_name) {
  // Clear the class name of icons
  this.node.document.node.className = this.node.document.node.className
    .split(' ')
    .filter(a => !/^icon-/.test(a))
    .join(' ');

  if (str_name) {
    this.node.document.addClass('icon-' + str_name);
    if (!this.node.img) {
      this.node.document.append(
        this.node.img = el('img', { src : 'bin/ergodox_icon.svg' })
      );
    }
  } else if (this.node.img) {
    // When icons are changed places, they sometimes go from having an icon
    // to not having an icon
    this.node.img.remove();
  }
};

Component.extend(Icon);
