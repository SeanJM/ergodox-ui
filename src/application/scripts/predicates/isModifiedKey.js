function isModifiedKey(keyCode) {
  var keySubstr = keyCode.substr(0, keyCode.indexOf('('));
  return isCommand('KC_' + keySubstr);
}
