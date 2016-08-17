Key.prototype.setParent = function (key) {
  this.isLayerToggle = key.isLayerToggle;
  this.keyHold = key.keyHold;
  this.str_iconPrimary = key.str_iconPrimary;
  this.str_iconSecondary = key.str_iconSecondary;
  this.str_primary = key.str_primary;
  this.isLocked = true;
  this.draw();
};
