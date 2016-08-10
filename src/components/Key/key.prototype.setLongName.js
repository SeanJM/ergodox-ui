Key.prototype.setLongName = function () {
  var keyCode = this.valueOf();

  // Long name
  if (this.parent) {
    notLayer.keys[i].str_longName = 'Locked because it is dependent on a toggle.';
  } else if (this.isHoldModifierTapKey) {
    this.str_longName = KEYBOARD.long_name[this.keyHold] + ' when held, ' + KEYBOARD.long_name[this.keyTap] + ' when tapped.';
  } else if (this.isHoldLayerTapKey) {
    this.str_longName = 'switch to layer ' + this.keyHold + ' when held, ' + KEYBOARD.primary[this.keyTap] + ' when tapped.';
  } else if (this.isMomentLayer) {
    this.str_longName = 'activates layer ' + this.keyHold + ' while held.';
  } else if (this.isLayerToggle) {
    this.str_longName = 'tap once to toggle "' + this.keyHold + '" layer tap again to toggle back.';
  } else if (this.isModifiedKey) {
    if (
      MODIFIERS.contains(this.keyHold)
      && MODIFIERS.contains(this.keyTap)
    ) {
      this.str_longName = KEYBOARD.primary['KC_' + this.keyHold] + ' + ' + KEYBOARD.primary[this.keyTap] + ' when held.';
    } else if (
      MODIFIERS.contains(this.keyHold)
      && KEYBOARD[this.keyHold]
      && KEYBOARD[this.keyHold][this.keyTap]
    ) {
      this.str_longName = KEYBOARD[this.keyHold][this.keyTap] + ' when pressed.';
    } else {
      this.str_longName = 'Unknown';
    }
  } else if (this.isFnKey) {
    this.str_longName = 'Fn key \"' + keyCode.match(/KC_FN([0-9]+)/)[1] + '\" this function is defined in keymap.c';
  } else if (this.isMacro) {
    this.str_longName = 'macro \"' + parseInt(this.keyTap, 10) + '\"';
  } else {
    this.str_longName = KEYBOARD.long_name[keyCode];
  }

  if (this.str_longName) {
    this.str_longName = this.str_longName[0].toUpperCase() + this.str_longName.substr(1);
  }
};
