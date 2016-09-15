function isMacro(code) {
  return code.substr(0, 2) === 'M(' || code === 'M';
}
