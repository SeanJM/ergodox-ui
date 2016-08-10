(function () {
  var EXCLUDE_PRIMARY = [
    'KC_BSPC',
    'KC_DOWN',
    'KC_LEFT',
    'KC_RGHT',
    'KC_SPC',
    'KC_UP',
  ];

  Key.prototype.draw = function () {
    var size = 0;

    this.node.document.node.className = this.node.document.node.className
      .replace(/key--size-[0-9]/, '')
      .replace(/\s+/, ' ');

    // Primary text
    if (this.str_primary && EXCLUDE_PRIMARY.indexOf(this.keyCode) === -1) {
      this.node.primary.text(
        this.isLetter
          ? this.str_primary.toUpperCase()
          : this.str_primary.replace(/\n/g, '<br/>')
      );
    } else {
      this.node.primary.text('');
    }
    // Secondary text
    if (this.str_secondary && !this.isLetter) {
      this.node.secondary.text(this.str_secondary.replace(/\n/g, '<br/>'));
    } else {
      this.node.secondary.text('');
    }

    this.node.iconPrimary.set(this.str_iconPrimary);
    this.node.iconSecondary.set(this.str_iconSecondary);

    if (
      this.str_primary
      &&
      EXCLUDE_PRIMARY.indexOf(this.keyCode) === -1
    ) {
      size++;
    }

    if (this.str_secondary) {
      size++;
    }

    if (this.str_iconPrimary) {
      size++;
    }

    if (this.str_iconSecondary) {
      size++;
    }

    this.setClass();
    this.node.document.addClass('key--size-' + size);
  };
}());
