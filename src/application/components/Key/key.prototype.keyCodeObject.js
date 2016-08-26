Key.prototype.keyCodeObject = function (keyCode) {
  var MATCH_KEYCODE = /^([A-Z0-9_]+)(?:\((?:([A-Z0-9_]+?),|)(?:| )([A-Z0-9_]+?)\)|)$/;

  var args = keyCode
    .match(MATCH_KEYCODE)
    .slice(1)
    .filter(a => a);

  // Store the keyCode
  this.keyCode = keyCode;
  Object.assign(this, KEYCODE.is(keyCode));

  this.str_iconPrimary = false;
  this.str_iconSecondary = false;
  this.keyTap = false;
  this.keyHold = false;
  this.str_primary = false;
  this.str_secondary = false;
  this.str_sendPrimary = false; // How the keys are activated (shift, tap, hold)
  this.str_sendSecondary = false; // How the keys are activated (shift, tap, hold)

  if (args[1]) { // Contains a key or keys inside parens, eg: TG(SYMB)
    if (this.isMacro) {
      // Is a Macro, macros are set up in 'keymaps/keymap_default.c'
      this.keyTap = args[1];
      this.str_primary = args[1];
      this.str_iconPrimary = KEYCODE.ICON.M;
    } else if (this.isMomentLayer) {
      // MO(layer) -- Activates the layer when held
      this.keyHold = args[1];
      this.str_primary = KEYCODE.PRIMARY[args[1]];
    } else if (this.isHoldModifierTapKey) {
      // CTL_T(KC_Z) -- is CTL when held, KC_Z when tapped
      this.keyHold = 'KC_' + args[0].substr(0, args[0].length - 2);
      this.keyTap = args[1];

      if (args[1] === 'KC_NO') {
        // when ALL_T(KC_NO) or HYPER_T(KC_NO) are used to simulate modifier keys
        this.str_primary = KEYCODE.PRIMARY[this.keyHold];
      } else {
        if (KEYCODE.PRIMARY[this.keyTap]) {
          this.str_primary = KEYCODE.PRIMARY[this.keyTap];
        } else if (KEYCODE.ICON[this.keyTap]) {
          this.str_iconPrimary = KEYCODE.ICON[this.keyTap];
        }
        if (KEYCODE.PRIMARY[this.keyHold]) {
          this.str_secondary = KEYCODE.PRIMARY[this.keyHold];
        } else if (KEYCODE.ICON[this.keyHold]) {
          this.str_iconSecondary = KEYCODE.ICON[this.keyHold];
        }
      }
    } else if (this.isHoldLayerTapKey) {
      // LT(layer, KC_GRV) -- Switch to layer layer when held, KC_GRV when tapped
      this.keyHold = args[1];
      this.keyTap = args[2];
      this.str_primary = KEYCODE.PRIMARY[this.keyTap];
      this.str_secondary = args[1];
    } else if (this.isLayerToggle) {
      // TG(layer) -- Will toggle the layer while it is tapped, tap again to toggle back
      this.keyHold = args[1];
      this.str_primary = args[1];
      this.str_iconPrimary = KEYCODE.ICON.toggle;
    } else if (this.isModifiedKey) {
      // LCTL(KC_1) | LSFT(KC_1) -- The value of the key when the modifier is applied
      this.keyHold = args[0];
      this.keyTap = args[1];
      this.str_primary = (
        KEYCODE[args[0]]
        && KEYCODE[args[0]][args[1]]
      ) ? KEYCODE[args[0]][args[1]]
        : KEYCODE.PRIMARY['KC_' + args[0]] + ' + ' + KEYCODE.PRIMARY[args[1]];
      if (KEYCODE.isShift(args[0])) {
        this.str_iconPrimary = KEYCODE.ICON.KC_LSFT;
      }
    }
  } else {
    // KC_QUOT | KC_EQL -- the normal keys
    this.keyTap = args[0];
    this.str_primary = KEYCODE.PRIMARY[args[0]] || false;
    this.str_secondary = KEYCODE.SFT[args[0]] || false;

    if (this.isMouseButton) {
      this.str_iconPrimary = KEYCODE.ICON.KC_BTN;
    } else {
      this.str_iconPrimary = KEYCODE.ICON[args[0]] || false;
    }
  }

  // Activation methods
  if (this.isHoldModifierTapKey) {
    this.str_sendPrimary = 'Tap';
    this.str_sendSecondary = 'Hold';
  } else if (this.isHoldLayerTapKey) {
    this.str_sendPrimary = 'Tap';
    this.str_sendSecondary = 'Hold';
  } else if (this.isMomentLayer) {
    // Activates layer when held
    this.str_sendPrimary = 'Tap';
  } else if (this.isLayerToggle) {
    this.str_sendPrimary = 'Tap';
  } else if (this.isModifiedKey) {
    if (
      KEYCODE.isModifier(this.keyTap)
      && KEYCODE.isModifier(this.keyHold)
    ) {
      this.str_sendPrimary = 'Hold';
    } else {
      this.str_sendPrimary = 'Tap';
    }
  } else if (KEYCODE.SFT[this.keyTap]) {
    this.str_sendPrimary = 'Tap';
    this.str_sendSecondary = 'Shift';
  }

  // KC_LEFT, KC_BSPC, KC_SPC
  if (
    !this.str_primary
    && KEYCODE.LONG_NAME[keyCode]
  ) {
    this.str_sendPrimary = 'Tap';
  }

  // KC_DELT, KC_LSFT, KC_LGUI, KC_PGUP etc...
  if (
    this.str_primary
    && !this.str_secondary
    && KEYCODE.PRIMARY[keyCode]
  ) {
    this.str_sendPrimary = 'Tap';
  }

  this.setLongName();
};
