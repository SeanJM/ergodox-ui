(function () {
  var MATCH_KEYCODE = /^([A-Z0-9_]+)(?:\((?:([A-Z0-9_]+?),|)(?:| )([A-Z0-9_]+?)\)|)$/;

  function getArgs(keyCode) {
    return keyCode
      .match(MATCH_KEYCODE)
      .slice(1)
      .filter(a => a)
      .map(function (a, i) {
        if (a.slice(-2) === '_T' && a.substr(0, 2) !== 'KC') {
          return 'KC_' + a.slice(0, -2);
        }

        if (isKeyCode(a) || isLayerName(a)) {
          return a;
        }

        return 'KC_' + a;
      });
  }

  function getIcon() {
    if ((
      this.args.length === 1 && KEYCODE[this.args[0]].icon
    ) || (
      this.isLayerToggle
    )) {
      return KEYCODE[this.args[0]].icon;
    } else if (this.isHoldModifierTapKey) {
      return KEYCODE[this.args[1]].icon;
    }

    return false;
  }

  function getKeyTap() {
    if (this.args.length === 1) {
      return this.args[0];
    }

    if (this.isLayerToggle) {
      return this.args[1];
    }

    if (this.isHoldLayerTapKey) {
      return this.args[2];
    }

    return this.args[1];
  }

  function getKeyHold() {
    if (this.isHoldLayerTapKey) {
      return this.args[1];
    }

    if (this.isLayerToggle) {
      return false;
    }

    if (this.args.length === 2) {
      return this.args[0];
    }

    return false;
  }

  function getPrimary() {
    if (this.args.length === 1) {
      return KEYCODE[this.args[0]].primary;
    }

    if (this.isLayerToggle) {
      return this.args[1];
    }

    if (this.isHoldLayerTapKey) {
      return KEYCODE[this.args[2]].primary;
    }

    console.log(this.args);
    return KEYCODE[this.args[1]].primary;
  }

  function getSecondary() {
    if (
      this.args.length === 1
      && KEYCODE[this.args[0]].shift
    ) {
      return KEYCODE[this.args[0]].shift;
    }

    if (
      this.args.length === 1
      || this.isLayerToggle
    ) {
      return false;
    }

    if (this.isHoldLayerTapKey) {
      return this.args[1];
    }

    return KEYCODE[this.args[0]].primary;
  }

  function getSendPrimary(args) {
    return 'Press';
  }

  function getSendSecondary(args) {
    if (
      this.args.length === 1
      && KEYCODE[this.args[0]].shift
    ) {
      return 'Shift';
    }
    return 'Hold';
  }

  Key.prototype.keyCodeObject = function (keyCode) {
    var args = getArgs(keyCode);

    if (isEmpty(keyCode)) {
      this.isEmpty = true;
    }

    if (isFnKey(keyCode)) {
      this.isFnKey = true;
    }

    if (isHoldLayerTapKey(keyCode)) {
      this.isHoldLayerTapKey = true;
    }

    if (isHoldModifierTapKey(keyCode)) {
      this.isHoldModifierTapKey = true;
    }

    if (isHyper(keyCode)) {
      this.isHyper = true;
    }

    if (isLayerSignal(keyCode)) {
      this.isLayerSignal = true;
    }

    if (isLayerToggle(keyCode)) {
      this.isLayerToggle = true;
    }

    if (isLetter(keyCode)) {
      this.isLetter = true;
    }

    if (isLocked(keyCode)) {
      this.isLocked = true;
    }

    if (isMacro(keyCode)) {
      this.isMacro = true;
    }

    if (isMedia(keyCode)) {
      this.isMedia = true;
    }

    if (isMeh(keyCode)) {
      this.isMeh = true;
    }

    if (isModifiedKey(keyCode)) {
      this.isModifiedKey = true;
    }

    if (isCommand(keyCode)) {
      this.isCommand = true;
    }

    if (isMomentLayer(keyCode)) {
      this.isMomentLayer = true;
    }

    if (isMouseButton(keyCode)) {
      this.isMouseButton = true;
    }

    if (isNumber(keyCode)) {
      this.isNumber = true;
    }

    if (isShift(keyCode)) {
      this.isShift = true;
    }

    if (isTransparent(keyCode)) {
      this.isTransparent = true;
    }

    if (isWeb(keyCode)) {
      this.isWeb = true;
    }

    this.keyCode = keyCode;
    this.args = args;

    this.str_icon = getIcon.call(this);
    this.keyTap = getKeyTap.call(this);
    this.keyHold = getKeyHold.call(this);

    this.str_primary = getPrimary.call(this);
    this.str_secondary = getSecondary.call(this);
    this.str_sendPrimary = getSendPrimary.call(this); // How the keys are activated (shift, tap, hold)
    this.str_sendSecondary = getSendSecondary.call(this); // How the keys are activated (shift, tap, hold)

    this.setLongName();
  };
}());
