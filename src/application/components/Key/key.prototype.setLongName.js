Key.prototype.setLongName = function () {
  // Long name
  if (this.parent) {
    notLayer.keys[i].name = 'Locked because it is dependent on a toggle.';
  } else if (isHoldModifierTapKey(this.code)) {
    this.name = KEYCODE[this.keyHold].name + ' when held, ' + KEYCODE[this.keyTap].name + ' when tapped.';
  } else if (isHoldLayerTapKey(this.code)) {
    this.name = 'switch to layer ' + this.keyHold + ' when held, ' + KEYCODE[this.keyTap].primary + ' when tapped.';
  } else if (isMomentLayer(this.code)) {
    this.name = 'activates layer ' + this.keyHold + ' while held.';
  } else if (isLayerToggle(this.code)) {
    this.name = 'tap once to toggle "' + this.keyTap + '" layer, tap again to toggle back.';
  } else if (this.isModifiedKey) {
    if (
      isCommand(this.keyHold)
      && isCommand(this.keyTap)
    ) {
      this.name = KEYCODE[this.keyHold].primary + ' + ' + KEYCODE[this.keyTap].primary + ' when held.';
    } else if (
      isCommand(this.keyHold)
      && KEYCODE[this.keyTap]
      && KEYCODE[this.keyTap].shift
    ) {
      this.name = KEYCODE[this.keyTap].shift + ' when pressed.';
    } else {
      this.name = 'Unknown';
    }
  } else if (this.isFnKey) {
    this.name = 'Function key \"' + this.args[1] + '\" this function is defined in keymap.c';
  } else if (isMacro(this.code)) {
    this.name = 'macro \"' + this.args[1] + '\"';
  } else {
    this.name = KEYCODE[this.code].name;
  }

  if (this.name) {
    this.name = this.name[0].toUpperCase() + this.name.substr(1);
  }
};
