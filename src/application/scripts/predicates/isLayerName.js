function isLayerName(a) {
  return !/_T/.test(a) && !KEYCODE['KC_' + a];
}
