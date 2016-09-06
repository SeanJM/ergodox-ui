// LT(SYMB, KC_GRV)
function isHoldLayerTapKey(code) {
  return code.substr(0, 3) === 'LT(';
}
