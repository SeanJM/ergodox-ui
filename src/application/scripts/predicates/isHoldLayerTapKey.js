// LT(SYMB, KC_GRV)
function isHoldLayerTapKey(keyCode) {
  return keyCode.substr(0, 3) === 'LT(';
}
