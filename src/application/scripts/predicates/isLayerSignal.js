function isLayerSignal(code) {
  return (
    isLayerToggle(code)
    || isHoldLayerTapKey(code)
    || isMomentLayer(code)
  );
}
