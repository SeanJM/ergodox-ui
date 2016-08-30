function isLayerSignal(keyCode) {
  return (
    isLayerToggle(keyCode)
    || isHoldLayerTapKey(keyCode)
    || isMomentLayer(keyCode)
  );
}
