function isLayerToggle(code) {
  return (
    code.substr(0, 3) === 'TG('
    || code === 'KC_TG'
  );
}
