Key.prototype.valueOf = function () {
  if (this.isMacro) {
    return 'M(' + this.keyTap + ')';
  }
  if (this.isMomentLayer) {
    return 'MO(' + this.keyHold + ')';
  }
  if (this.isHoldModifierTapKey) {
    return this.keyHold.substr(3) + '_T(' + this.keyTap + ')';
  }
  if (this.isHoldLayerTapKey) {
    return 'LT(' + this.keyHold + ',' + this.keyTap + ')';
  }
  if (this.isLayerToggle) {
    return 'TG(' + this.keyTap + ')';
  }
  if (this.isModifiedKey) {
    return this.keyHold + '(' + this.keyTap + ')';
  }
  return this.keyTap;
};
