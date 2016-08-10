(function () {
  var MATCH_KEYCODE = /^([A-Z0-9_]+)(?:\((?:([A-Z0-9_]+?),|)(?:| )([A-Z0-9_]+?)\)|)$/;

  Key.prototype.keyCodeObject = function (keyCode) {
    var args = keyCode
      .match(MATCH_KEYCODE)
      .slice(1)
      .filter(a => a);

    // Store the keyCode
    this.keyCode = keyCode;

    // Booleans
    this.isFnKey = /^KC_FN([0-9]|1[0-9]|2[0-9]|30|31|32)$/.test(keyCode);
    this.isHoldLayerTapKey = args[0] === 'LT';
    this.isHoldModifierTapKey = args.length > 1 && /_T$/.test(args[0]);
    this.isLayerToggle = args[0] === 'TG';
    this.isLetter = /^KC_[A-Z]$/.test(keyCode);
    this.isLocked = false; // locked keys are KC_TRNS because they have a toggle sibling
    this.isMacro = args[0] === 'M';
    this.isModifiedKey = MODIFIERS.indexOf(args[0]) > -1 && args.length > 1;
    this.isMomentLayer = args[0] === 'MO';
    this.isMouseButton = /^KC_BTN(1|2|3|4|5)$/.test(keyCode);
    this.isTransparent = keyCode === 'KC_TRNS';

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
        this.str_iconPrimary = KEYBOARD.icon.M;
      } else if (this.isMomentLayer) {
        // MO(layer) -- Activates the layer when held
        this.keyHold = args[1];
        this.str_primary = KEYBOARD.primary[args[1]];
      } else if (this.isHoldModifierTapKey) {
        // CTL_T(KC_Z) -- is CTL when held, KC_Z when tapped
        this.keyHold = 'KC_' + args[0].substr(0, args[0].length - 2);
        this.keyTap = args[1];

        if (args[1] === 'KC_NO') {
          // when ALL_T(KC_NO) or HYPER_T(KC_NO) are used to simulate modifier keys
          this.str_primary = KEYBOARD.primary[this.keyHold];
        } else {
          if (KEYBOARD.primary[this.keyTap]) {
            this.str_primary = KEYBOARD.primary[this.keyTap];
          } else if (KEYBOARD.icon[this.keyTap]) {
            this.str_iconPrimary = KEYBOARD.icon[this.keyTap];
          }
          if (KEYBOARD.primary[this.keyHold]) {
            this.str_secondary = KEYBOARD.primary[this.keyHold];
          } else if (KEYBOARD.icon[this.keyHold]) {
            this.str_iconSecondary = KEYBOARD.icon[this.keyHold];
          }
        }
      } else if (this.isHoldLayerTapKey) {
        // LT(layer, KC_GRV) -- Switch to layer layer when held, KC_GRV when tapped
        this.keyHold = args[1];
        this.keyTap = args[2];
        this.str_primary = KEYBOARD.primary[this.keyTap];
        this.str_secondary = args[1];
      } else if (this.isLayerToggle) {
        // TG(layer) -- Will toggle the layer while it is tapped, tap again to toggle back
        this.keyHold = args[1];
        this.str_primary = args[1];
        this.str_iconPrimary = KEYBOARD.icon.toggle;
      } else if (this.isModifiedKey) {
        // LCTL(KC_1) | LSFT(KC_1) -- The value of the key when the modifier is applied
        this.keyHold = args[0];
        this.keyTap = args[1];
        this.str_primary = (
          KEYBOARD[args[0]]
          && KEYBOARD[args[0]][args[1]]
        ) ? KEYBOARD[args[0]][args[1]]
        : KEYBOARD.primary['KC_' + args[0]] + ' + ' + KEYBOARD.primary[args[1]];
      }
    } else {
      // KC_QUOT | KC_EQL -- the normal keys
      this.keyTap = args[0];
      this.str_primary = KEYBOARD.primary[args[0]] || false;
      this.str_secondary = KEYBOARD.SFT[args[0]] || false;

      if (this.isMouseButton) {
        this.str_iconPrimary = KEYBOARD.icon.KC_BTN;
      } else {
        this.str_iconPrimary = KEYBOARD.icon[args[0]] || false;
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
        MODIFIERS.contains(this.keyTap)
        && MODIFIERS.contains(this.keyHold)
      ) {
        this.str_sendPrimary = 'Hold';
      } else {
        this.str_sendPrimary = 'Tap';
      }
    } else if (KEYBOARD.SFT[this.keyTap]) {
      this.str_sendPrimary = 'Tap';
      this.str_sendSecondary = 'Shift';
    }

    // KC_LEFT, KC_BSPC, KC_SPC
    if (
      !this.str_primary
      && KEYBOARD.long_name[keyCode]
    ) {
      this.str_sendPrimary = 'Tap';
    }

    // KC_DELT, KC_LSFT, KC_LGUI, KC_PGUP etc...
    if (
      this.str_primary
      && !this.str_secondary
      && KEYBOARD.primary[keyCode]
    ) {
      this.str_sendPrimary = 'Tap';
    }

    this.setLongName();
  };
}());
