function IconLarge() {
  this.node = {
    document : el({ class : 'icon-large' },
      el('img', { src : 'bin/ergodox_icon-large.svg' })
    )
  };
}

Component.extend(IconLarge);

IconLarge.prototype.text = function (value) {
  this.node.document.addClass('icon-large--' + value);
};
