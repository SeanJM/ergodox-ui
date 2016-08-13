Key.prototype.setLongName = function () {
  var keyCode = this.valueOf();

  // Long name
  if (this.parent) {
    notLayer.keys[i].str_longName = 'Locked because it is dependent on a toggle.';
  } else if (this.isHoldModifierTapKey) {
    this.str_longName = KEYCODE.LONG_NAME[this.keyHold] + ' when held, ' + KEYCODE.LONG_NAME[this.keyTap] + ' when tapped.';
  } else if (this.isHoldLayerTapKey) {
    this.str_longName = 'switch to layer ' + this.keyHold + ' when held, ' + KEYCODE.PRIMARY[this.keyTap] + ' when tapped.';
  } else if (this.isMomentLayer) {
    this.str_longName = 'activates layer ' + this.keyHold + ' while held.';
  } else if (this.isLayerToggle) {
    this.str_longName = 'tap once to toggle "' + this.keyHold + '" layer tap again to toggle back.';
  } else if (this.isModifiedKey) {
    if (
      KEYCODE.isModifier(this.keyHold)
      && KEYCODE.isModifier(this.keyTap)
    ) {
      this.str_longName = KEYCODE.PRIMARY['KC_' + this.keyHold] + ' + ' + KEYCODE.PRIMARY[this.keyTap] + ' when held.';
    } else if (
      KEYCODE.isModifier(this.keyHold)
      && KEYCODE[this.keyHold]
      && KEYCODE[this.keyHold][this.keyTap]
    ) {
      this.str_longName = KEYCODE[this.keyHold][this.keyTap] + ' when pressed.';
    } else {
      this.str_longName = 'Unknown';
    }
  } else if (this.isFnKey) {
    this.str_longName = 'Fn key \"' + keyCode.match(/KC_FN([0-9]+)/)[1] + '\" this function is defined in keymap.c';
  } else if (this.isMacro) {
    this.str_longName = 'macro \"' + parseInt(this.keyTap, 10) + '\"';
  } else {
    this.str_longName = KEYCODE.LONG_NAME[keyCode];
  }

  if (this.str_longName) {
    this.str_longName = this.str_longName[0].toUpperCase() + this.str_longName.substr(1);
  }
};
