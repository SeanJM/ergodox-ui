(function () {
  var CLEAR_CLASSES = [
    'key--modified',
    'key--hold-key-tap-key',
    'key--hold-layer-tap-key',
    'key--layer-toggle',
    'key--macro',
    'key--locked',
    'key--transparent',
    'key--default',
  ];

  function isUpperCase(self) {
    if (isLetter(self.code)) {
      return true;
    } else if (
      self.isHoldModifierTapKey
      && isLetter(self.args[1])
    ) {
      return true;
    }
    return false;
  }

  function isStrPrimary(self) {
    if (self.isMedia) {
      return false;
    } else if (self.isWeb) {
      return false;
    } else if (self.isNavigation && self.str_icon) {
      return false;
    } else if (
      self.isHoldModifierTapKey
      && (isMedia(self.args[1]) || isWeb(self.args[1]))
    ) {
      return false;
    }

    return (
      self.str_primary && !self.isMedia
    ) && !(
      self.isModifiedKey
      && isCommand(self.args[1])
    );
  }

  function setPrimaryText() {
    // Primary text
    if (isUpperCase(this)) {
      this.node.primary.text(this.str_primary.toUpperCase());
    } else if (
      (this.isHyper || this.isMeh)
      && isEmpty(this.args[1])
    ) {
      this.node.primary.text(this.str_secondary);
    } else if (
      this.isModifiedKey
      && isCommand(this.args[1])
    ) {
      this.node.primary.text(
        `${this.str_primary} + ${this.str_secondary}`
      );
    } else if (
      this.isModifiedKey
      && isShift(this.args[0])
      && KEYCODE[this.args[1]].shift
    ) {
      this.node.primary.text(KEYCODE[this.args[1]].shift);
    } else if (isStrPrimary(this)) {
      this.node.primary.text(this.str_primary);
    } else {
      this.node.primary.text('');
    }
  }

  function setSecondaryText() {
    // Secondary text
    if (
      this.str_secondary
      && !this.isLetter
      && !this.isHyper
      && !this.isMeh
      && !(this.isModifiedKey && isCommand(this.args[1]))
      && !(this.isModifiedKey && isShift(this.args[0]))
    ) {
      this.node.secondary.text(
        this.str_secondary.replace(/\n/g, '<br/>')
      );
    } else {
      this.node.secondary.text('');
    }
  }

  function setIcon() {
    if (this.str_icon) {
      this.icon(this.str_icon);
    } else if (this.isModifiedKey && isShift(this.args[0])) {
      this.icon(KEYCODE.KC_LSFT.icon);
    }
  }

  Key.prototype.draw = function () {
    setPrimaryText.call(this);
    setSecondaryText.call(this);
    setIcon.call(this);

    this.node.document.removeClass(CLEAR_CLASSES);

    if (this.isModifiedKey) {
      this.node.document.addClass('key--modified');
    } else if (this.isHoldModifierTapKey) {
      this.node.document.addClass('key--hold-key-tap-key');
    } else if (this.isHoldLayerTapKey) {
      this.node.document.addClass('key--hold-layer-tap-key');
    } else if (this.isLayerToggle) {
      this.node.document.addClass('key--layer-toggle');
    } else if (this.isMacro) {
      this.node.document.addClass('key--macro');
    } else {
      this.node.document.addClass('key--default');
    }

    if (this.isTransparent) {
      this.node.document.addClass('key--transparent');
    }
  };
}());
