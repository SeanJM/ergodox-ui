function Icon() {
  this.img = false;
  this.node = {
    document : el({ class : 'icon' })
  };
}

Icon.prototype.set = function (str_name) {
  if (str_name) {
    this.node.document.node.className = this.node.document.node.className
      .split(' ')
      .filter(a => !/^icon-/.test(a))
      .join(' ');
    this.node.document.addClass('icon-' + str_name);
    if (!this.node.img) {
      this.node.document.append(
        this.node.img = el('img', { src : 'bin/ergodox_icon.svg' })
      );
    }
  }
};

Component.extend(Icon);
