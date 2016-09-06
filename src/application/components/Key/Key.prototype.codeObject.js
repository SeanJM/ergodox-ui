(function () {
  var MATCH_KEYCODE = /^([A-Z0-9_]+)(?:\((?:([A-Z0-9_]+?),|)(?:| )([A-Z0-9_]+?)\)|)$/;

  function getArgs(code) {
    return code
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

  Key.prototype.codeObject = function (code) {
    var args = getArgs(code);

    if (isEmpty(code)) {
      this.isEmpty = true;
    }

    if (isFnKey(code)) {
      this.isFnKey = true;
    }

    if (isHoldLayerTapKey(code)) {
      this.isHoldLayerTapKey = true;
    }

    if (isHoldModifierTapKey(code)) {
      this.isHoldModifierTapKey = true;
    }

    if (isHyper(code)) {
      this.isHyper = true;
    }

    if (isLayerSignal(code)) {
      this.isLayerSignal = true;
    }

    if (isLayerToggle(code)) {
      this.isLayerToggle = true;
    }

    if (isLetter(code)) {
      this.isLetter = true;
    }

    if (isLocked(code)) {
      this.isLocked = true;
    }

    if (isMacro(code)) {
      this.isMacro = true;
    }

    if (isMedia(code)) {
      this.isMedia = true;
    }

    if (isMeh(code)) {
      this.isMeh = true;
    }

    if (isModifiedKey(code)) {
      this.isModifiedKey = true;
    }

    if (isCommand(code)) {
      this.isCommand = true;
    }

    if (isMomentLayer(code)) {
      this.isMomentLayer = true;
    }

    if (isMouseButton(code)) {
      this.isMouseButton = true;
    }

    if (isNumber(code)) {
      this.isNumber = true;
    }

    if (isShift(code)) {
      this.isShift = true;
    }

    if (isTransparent(code)) {
      this.isTransparent = true;
    }

    if (isWeb(code)) {
      this.isWeb = true;
    }

    if (isNavigation(code)) {
      this.isNavigation = true;
    }

    this.code = code;
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
