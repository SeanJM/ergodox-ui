function Icon() {
  this.node = {
    document : el('svg', { class : 'icon' })
  };

  this.node.document.append(
    this.node.use = el('use')
  );
}

Icon.prototype.remove = function () {
  this.node.document.remove();
};

Icon.prototype.large = function () {
  this.node.document.addClass('icon-large');
};

Icon.prototype.text = function (str_value) {
  this.node.document.addClass('icon-' + str_value);
  this.node.use.attr('href', '#icon_' + str_value);
};

Component.extend(Icon);
