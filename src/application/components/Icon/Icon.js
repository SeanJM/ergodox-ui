function Icon() {
  this.img = false;

  this.node = {
    document : el({ class : 'icon' })
  };

  this.node.document.append(
    this.node.img = el(ICON_SVG)
  );
}

Icon.prototype.text = function (str_value) {
  var className = this.node.document.node.className;

  this.node.document.node.className = className
    .split(' ')
    .filter(a => !/^icon-/.test(a))
    .join(' ') +
    ' icon-' + str_value;
};

Component.extend(Icon);
