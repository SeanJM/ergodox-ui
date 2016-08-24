KEYCODE.isFnKey = function (keyCode) {
  return /^KC_FN([0-9]|1[0-9]|2[0-9]|30|31|32)$/.test(keyCode);
};

KEYCODE.isShift = function (keyCode) {
  var shift = ['KC_LSFT', 'KC_RSFT', 'KC_SFT', 'LSFT', 'RSFT'];
  return shift.indexOf(keyCode) > -1;
};

KEYCODE.isHoldModifierTapKey = function (keyCode) {
  return /_T\(/.test(keyCode);
};

// Layer signals

KEYCODE.isHoldLayerTapKey = function (keyCode) {
  return keyCode.substr(0, 3) === 'LT(';
};

KEYCODE.isLayerToggle = function (keyCode) {
  return keyCode.substr(0, 3) === 'TG(';
};

KEYCODE.isMomentLayer = function (keyCode) {
  return keyCode.substr(0, 3) === 'MO(';
};

KEYCODE.isLayerSignal = function (keyCode) {
  return (
    KEYCODE.isLayerToggle(keyCode)
    || KEYCODE.isHoldLayerTapKey(keyCode)
    || KEYCODE.isMomentLayer(keyCode)
  );
};

KEYCODE.isLetter = function (keyCode) {
  return /^KC_[A-Z]$/.test(keyCode);
};

KEYCODE.isLocked = function (keyCode) {
  return false;
};

KEYCODE.isMacro = function (keyCode) {
  return keyCode.substr(0, 2) === 'M(';
};

KEYCODE.isModifier = function (keyCode) {
  return KEYCODE.MODIFIERS.indexOf(keyCode) > -1;
};

KEYCODE.isModifiedKey = function (keyCode) {
  var keySubstr = keyCode.substr(0, keyCode.indexOf('('));
  return KEYCODE.isModifier(keySubstr);
};

KEYCODE.isMouseButton = function (keyCode) {
  return /^KC_BTN(1|2|3|4|5)$/.test(keyCode);
};

KEYCODE.isEmpty = function (keyCode) {
  return keyCode === 'KC_TRNS';
};
