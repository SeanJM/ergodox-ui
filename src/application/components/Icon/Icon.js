function Icon() {
  this.img = false;

  this.node = {
    document : el({ class : 'icon' })
  };

  this.node.document.append(
    this.node.img = el(ICON_KEYS)
  );
}

Icon.prototype.remove = function () {
  this.node.document.remove();
};

Icon.prototype.large = function () {
  this.node.document.addClass('icon-large');
};

Icon.prototype.text = function (str_value) {
  var className = this.node.document.node.className;

  this.node.document.node.className = className
    .split(' ')
    .filter(a => !/^icon-/.test(a))
    .join(' ') +
    ' icon-' + str_value;
};

Component.extend(Icon);
