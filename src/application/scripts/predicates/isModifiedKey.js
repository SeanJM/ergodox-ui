function isModifiedKey(code) {
  var keySubstr = code.substr(0, code.indexOf('('));
  return isCommand('KC_' + keySubstr);
}
