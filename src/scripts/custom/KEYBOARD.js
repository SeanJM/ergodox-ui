KEYBOARD = {};

KEYBOARD.TRNS = 'KC_TRNS';

KEYBOARD.list = [
  'KC_NO',
  'KC_TRNS', // Transparent

  // Function keys
  'KC_F1',
  'KC_F2',
  'KC_F3',
  'KC_F4',
  'KC_F5',
  'KC_F6',
  'KC_F7',
  'KC_F8',
  'KC_F9',
  'KC_F10',
  'KC_F11',
  'KC_F12',

  // Numbers
  'KC_1',
  'KC_2',
  'KC_3',
  'KC_4',
  'KC_5',
  'KC_6',
  'KC_7',
  'KC_8',
  'KC_9',
  'KC_0',

  'KC_EQL',

  // Alphabet
  'KC_A',
  'KC_B',
  'KC_C',
  'KC_D',
  'KC_E',
  'KC_F',
  'KC_G',
  'KC_H',
  'KC_I',
  'KC_J',
  'KC_K',
  'KC_L',
  'KC_M',
  'KC_N',
  'KC_O',
  'KC_P',
  'KC_Q',
  'KC_R',
  'KC_S',
  'KC_T',
  'KC_U',
  'KC_V',
  'KC_W',
  'KC_X',
  'KC_Y',
  'KC_Z',

  // Punctuation
  'KC_BSLS',
  'KC_COMM',
  'KC_DOT',
  'KC_EXLM',
  'KC_GRV',
  'KC_LBRC',
  'KC_QUOT',
  'KC_RBRC',
  'KC_SCLN',
  'KC_SLSH',

  // Quantum Common
  'KC_AMPR',
  'KC_ASTR',
  'KC_AT',
  'KC_CIRC',
  'KC_COLN',
  'KC_DLR',
  'KC_EXLM',
  'KC_HASH',
  'KC_LCBR',
  'KC_LPRN',
  'KC_PERC',
  'KC_PIPE',
  'KC_PLUS',
  'KC_RCBR',
  'KC_RPRN',
  'KC_TILD',
  'KC_UNDS',

  // Navigation
  'KC_LEFT',
  'KC_RGHT',
  'KC_UP',
  'KC_DOWN',

  'KC_MINS',

  // Editing
  'KC_HOME',
  'KC_END',
  'KC_PGUP',
  'KC_PGDN',
  'KC_ESC',
  'KC_TAB',
  'KC_ENT',
  'KC_BSPC',
  'KC_DELT',
  'KC_SPC',

  // Modifiers
  'KC_LSFT',
  'KC_RSFT',
  'KC_ALT',
  'KC_LALT',
  'KC_RALT',
  'KC_GUI',
  'KC_LGUI',
  'KC_RGUI',
  'KC_CTL',
  'KC_MEH',
  'KC_ALL',
  'KC_LT',

  // KC_NO means no actions, a null key
  'KC_NO',

  // I don't know what this means
  'KC_APP',

  // Mouse
  'KC_MS_U',
  'KC_MS_D',
  'KC_MS_L',
  'KC_MS_R',

  // Media
  'KC_MSTP',
  'KC_MPLY',
  'KC_MPRV',
  'KC_MNXT',
  'KC_VOLU',
  'KC_VOLD',
  'KC_MUTE',
  'KC_WBAK',
  'KC_MSTP',
  'KC_MSEL',

  // Mouse
  'KC_BTN1',
  'KC_BTN2',
  'KC_BTN3',
  'KC_BTN4',
  'KC_BTN5',
  'KC_BTN6',

  // Applications
  'KC_MAIL',
  'KC_CALC',
  'KC_MYCM', // My Computer
  'KC_WSCH', // Search

  // Web browser
  'KC_WHOM',
  'KC_WBAK',
  'KC_WFWD',
  'KC_WSTP',
  'KC_WREF',
  'KC_WFAV',

  // Computer controls
  'KC_PWR',
  'KC_SLEP',
  'KC_WAKE',
];

KEYBOARD.primary = {
  'KC_NO' : false,
  'KC_TRNS' : undefined,
  'KC_EQL' : '=',

  // Function keys
  'KC_F1' : 'F1',
  'KC_F2' : 'F2',
  'KC_F3' : 'F3',
  'KC_F4' : 'F4',
  'KC_F5' : 'F5',
  'KC_F6' : 'F6',
  'KC_F7' : 'F7',
  'KC_F8' : 'F8',
  'KC_F9' : 'F9',
  'KC_F10' : 'F10',
  'KC_F11' : 'F11',
  'KC_F12' : 'F12',

  // Number keys
  'KC_1' : '1',
  'KC_2' : '2',
  'KC_3' : '3',
  'KC_4' : '4',
  'KC_5' : '5',
  'KC_6' : '6',
  'KC_7' : '7',
  'KC_8' : '8',
  'KC_9' : '9',
  'KC_0' : '0',

  // Alphabet
  'KC_A' : 'a',
  'KC_B' : 'b',
  'KC_C' : 'c',
  'KC_D' : 'd',
  'KC_E' : 'e',
  'KC_F' : 'f',
  'KC_G' : 'g',
  'KC_H' : 'h',
  'KC_I' : 'i',
  'KC_J' : 'j',
  'KC_K' : 'k',
  'KC_L' : 'l',
  'KC_M' : 'm',
  'KC_N' : 'n',
  'KC_O' : 'o',
  'KC_P' : 'p',
  'KC_Q' : 'q',
  'KC_R' : 'r',
  'KC_S' : 's',
  'KC_T' : 't',
  'KC_U' : 'u',
  'KC_V' : 'v',
  'KC_W' : 'w',
  'KC_X' : 'x',
  'KC_Y' : 'y',
  'KC_Z' : 'z',

  // Punctuation
  'KC_BSLS' : '\\',
  'KC_COMM' : ',',
  'KC_DOT' : '.',
  'KC_GRV' : '`',
  'KC_LBRC' : '[',
  'KC_QUOT' : '\'',
  'KC_RBRC' : ']',
  'KC_SCLN' : ';',
  'KC_SLSH' : '/',
  'KC_MINS' : '-',

  // Quantum Common
  'KC_AMPR' : '&',
  'KC_ASTR' : '*',
  'KC_AT' : '@',
  'KC_CIRC' : '^',
  'KC_COLN' : ':',
  'KC_DLR' : '$',
  'KC_EXLM' : '!',
  'KC_HASH' : '#',
  'KC_LCBR' : '{',
  'KC_LPRN' : '(',
  'KC_PERC' : '%',
  'KC_PIPE' : '|',
  'KC_PLUS' : '+',
  'KC_RCBR' : '}',
  'KC_RPRN' : ')',
  'KC_TILD' : '~',
  'KC_UNDS' : '_',

  // Navigation
  'KC_LEFT' : 'Left',
  'KC_RGHT' : 'Right',
  'KC_UP' : 'Up',
  'KC_DOWN' : 'Down',

  // Editing
  'KC_HOME' : 'Home',
  'KC_END' : 'End',
  'KC_PGUP' : 'Page \nUp',
  'KC_PGDN' : 'Page Down',
  'KC_ESC' : 'Esc',
  'KC_TAB' : 'Tab',
  'KC_ENT' : 'Enter',
  'KC_DELT' : 'Delete',

  // Modifiers
  'KC_LSFT' : 'Shift',
  'KC_RSFT' : 'Shift',

  'KC_ALT' : 'Alt',

  'KC_LALT' : 'Alt',
  'KC_RALT' : 'Alt',

  'KC_GUI' : 'Cmd',
  'KC_LGUI' : 'Cmd',
  'KC_RGUI' : 'Cmd',

  'KC_CTL' : 'Ctrl',
  'KC_LCTL' : 'Ctrl',
  'KC_RCTL' : 'Ctrl',

  'KC_ALL' : 'Hyper',
  'KC_LT' : 'Layer Toggle',

  'KC_MEH' : 'MEH',

  // I don't know what this means
  'KC_APP' : 'App',

  // Spacing
  'KC_BSPC' : 'Backspace',
  'KC_SPC' : 'Space',

  // Mouse
  'KC_BTN1' : '1',
  'KC_BTN2' : '2',
  'KC_BTN3' : '3',
  'KC_BTN4' : '4',
  'KC_BTN5' : '5',
  'KC_BTN6' : '6',
};

// Direct layer select: KC_FN1
for (var i = 1, n = 10; i < n; i++) {
  KEYBOARD.primary['KC_FN' + i] = 'Fn ' + i;
}

KEYBOARD.SFT = {
  'KC_1' : '!',
  'KC_2' : '@',
  'KC_3' : '#',
  'KC_4' : '$',
  'KC_5' : '%',
  'KC_6' : '^',
  'KC_7' : '&',
  'KC_8' : '*',
  'KC_9' : '(',
  'KC_0' : ')',

  'KC_A' : 'A',
  'KC_B' : 'B',
  'KC_C' : 'C',
  'KC_D' : 'D',
  'KC_E' : 'E',
  'KC_F' : 'F',
  'KC_G' : 'G',
  'KC_H' : 'H',
  'KC_I' : 'I',
  'KC_J' : 'J',
  'KC_K' : 'K',
  'KC_L' : 'L',
  'KC_M' : 'M',
  'KC_N' : 'N',
  'KC_O' : 'O',
  'KC_P' : 'P',
  'KC_Q' : 'Q',
  'KC_R' : 'R',
  'KC_S' : 'S',
  'KC_T' : 'T',
  'KC_U' : 'U',
  'KC_V' : 'V',
  'KC_W' : 'W',
  'KC_X' : 'X',
  'KC_Y' : 'Y',
  'KC_Z' : 'Z',

  'KC_EQL' : '+',
  'KC_GRV' : '~',
  'KC_QUOT' : '"',
  'KC_COMM' : '<',
  'KC_DOT' : '>',
  'KC_LBRC' : '{',
  'KC_RBRC' : '}',
  'KC_BSLS' : '|',
  'KC_SLSH' : '?',
  'KC_SCLN' : ':',

  'KC_MINS' : '_',
};

KEYBOARD.LSFT = KEYBOARD.SFT;
KEYBOARD.RSFT = KEYBOARD.SFT;

KEYBOARD.icon = {
  // Special
  'M' : 'macro',

  // Navigation
  'KC_LEFT' : 'left',
  'KC_RGHT' : 'right',
  'KC_UP' : 'up',
  'KC_DOWN' : 'down',

  // Spacing
  'KC_TAB' : 'tab',
  'KC_ENT' : 'enter',
  'KC_BSPC' : 'backspace',
  'KC_SPC' : 'space',

  // Modifiers
  'KC_LSFT' : 'shift',
  'KC_RSFT' : 'shift',
  'KC_ALT' : 'alt',
  'KC_LALT' : 'alt',
  'KC_RALT' : 'alt',
  'KC_GUI' : 'cmd',
  'KC_LGUI' : 'cmd',
  'KC_RGUI' : 'cmd',
  'KC_CTL' : 'control',
  'KC_MEH' : 'meh',

  // KC_NO means no actions, a null key
  'KC_NO' : 'none',

  toggle : 'toggle',

  // Mouse
  'KC_BTN' : 'mouse-button',
  'KC_MS_U' : 'mouse-up',
  'KC_MS_D' : 'mouse-down',
  'KC_MS_L' : 'mouse-left',
  'KC_MS_R' : 'mouse-right',

  // Media
  'KC_MPLY' : 'media-play',
  'KC_MSTP' : 'media-stop',
  'KC_MPRV' : 'media-previous',
  'KC_MNXT' : 'media-next',
  'KC_VOLU' : 'media-volume-up',
  'KC_VOLD' : 'media-volume-down',
  'KC_MUTE' : 'media-mute',

  // Web browser
  'KC_WBAK' : 'www-back',
  'KC_WHOM' : 'www-home',
  'KC_WFWD' : 'www-forward',
  'KC_WSTP' : 'www-stop',
  'KC_WREF' : 'www-refresh',
  'KC_WFAV' : 'www-favorites',

  // Computer controls
  'KC_PWR' : 'computer-power',
  'KC_SLEP' : 'computer-sleep',
  'KC_WAKE' : 'computer-wake',
};

KEYBOARD.long_name = {
  // KC_NO means no actions, a null key
  'KC_NO' : 'does nothing',
  'KC_TRNS' : 'does nothing',

  'KC_EQL' : 'equal and plus',

  // Function keys
  'KC_F1' : 'function key 1',
  'KC_F2' : 'function key 2',
  'KC_F3' : 'function key 3',
  'KC_F4' : 'function key 4',
  'KC_F5' : 'function key 5',
  'KC_F6' : 'function key 6',
  'KC_F7' : 'function key 7',
  'KC_F8' : 'function key 8',
  'KC_F9' : 'function key 9',
  'KC_F10' : 'function key 10',
  'KC_F11' : 'function key 11',
  'KC_F12' : 'function key 12',

  // Numbers
  'KC_1' : 'one and exclamation',
  'KC_2' : 'two and \'at\' symbol',
  'KC_3' : 'three and hash/pound',
  'KC_4' : 'four and dollar',
  'KC_5' : 'five and percentage',
  'KC_6' : 'six and carat',
  'KC_7' : 'seven and ampersand',
  'KC_8' : 'eight and wildcard/star',
  'KC_9' : 'nine and open parentheses',
  'KC_0' : 'zero and closed parentheses',

  // Alphabet
  'KC_A' : 'a and A',
  'KC_B' : 'b and B',
  'KC_C' : 'c and C',
  'KC_D' : 'd and D',
  'KC_E' : 'e and E',
  'KC_F' : 'f and F',
  'KC_G' : 'g and G',
  'KC_H' : 'h and H',
  'KC_I' : 'i and I',
  'KC_J' : 'j and J',
  'KC_K' : 'k and K',
  'KC_L' : 'l and L',
  'KC_M' : 'm and M',
  'KC_N' : 'n and N',
  'KC_O' : 'o and O',
  'KC_P' : 'p and P',
  'KC_Q' : 'q and Q',
  'KC_R' : 'r and R',
  'KC_S' : 's and S',
  'KC_T' : 't and T',
  'KC_U' : 'u and U',
  'KC_V' : 'v and V',
  'KC_W' : 'w and W',
  'KC_X' : 'x and X',
  'KC_Y' : 'y and Y',
  'KC_Z' : 'z and Z',

  // Punctuation
  'KC_BSLS' : 'backslash and pipe',
  'KC_COMM' : 'comma and open angle bracket (less than)',
  'KC_DOT' : 'period and closed angle bracket (greater than)',
  'KC_GRV' : 'grave symbol and tilde',
  'KC_LBRC' : 'open bracket and open curly brace',
  'KC_QUOT' : 'single and double quotes',
  'KC_RBRC' : 'closed bracket and closed curly brace',
  'KC_SCLN' : 'semi colon and colon',
  'KC_SLSH' : 'forward slash and question mark',

  // Quantum Common
  'KC_AMPR' : 'ampersand',
  'KC_ASTR' : 'star or wildcard',
  'KC_AT' : 'at',
  'KC_CIRC' : 'caret or circumflex',
  'KC_COLN' : 'colon',
  'KC_DLR' : 'dollar',
  'KC_EXLM' : 'exclamation point` ',
  'KC_HASH' : 'hash or pound',
  'KC_LCBR' : 'open curly brace',
  'KC_LPRN' : 'open parentheses',
  'KC_PERC' : 'percent',
  'KC_PIPE' : 'pipe',
  'KC_PLUS' : 'plus',
  'KC_RCBR' : 'closed curly brace',
  'KC_RPRN' : 'closed parentheses',
  'KC_TILD' : 'tilde',
  'KC_UNDS' : 'underscore',

  // Navigation
  'KC_LEFT' : 'left arrow',
  'KC_RGHT' : 'right arrow',
  'KC_UP' : 'up arrow',
  'KC_DOWN' : 'down arrow',

  'KC_MINS' : 'minus and underscore',

  // Editing
  'KC_HOME' : 'home',
  'KC_END' : 'end',
  'KC_PGUP' : 'page up',
  'KC_PGDN' : 'page down',
  'KC_ESC' : 'escape',
  'KC_TAB' : 'tab',
  'KC_ENT' : 'enter',
  'KC_BSPC' : 'backspace',
  'KC_DELT' : 'delete',
  'KC_SPC' : 'space',

  // Modifiers
  'KC_LSFT' : 'left shift',
  'KC_RSFT' : 'right shift',
  'KC_ALT' : 'alt',
  'KC_LALT' : 'left alt',
  'KC_RALT' : 'right alt',
  'KC_GUI' : 'command or windows key',
  'KC_LGUI' : 'left command or windows key',
  'KC_RGUI' : 'right command or windows key',
  'KC_CTL' : 'control',
  'KC_MEH' : 'control + alt + shift',
  'KC_ALL' : 'control + alt + shift + command/windows key',
  'KC_LT' : 'open angled bracket (less than)',

  // I don't know what this means
  'KC_APP' : 'application',

  // Mouse
  'KC_BTN1' : 'left click',
  'KC_BTN2' : 'right click',
  'KC_BTN3' : 'mouse button 3',
  'KC_BTN4' : 'mouse button 4',
  'KC_BTN5' : 'mouse button 5',
  'KC_BTN6' : 'mouse button 6',

  'KC_MS_U' : 'mouse mouse cursor up',
  'KC_MS_D' : 'mouse mouse cursor down',
  'KC_MS_L' : 'mouse mouse cursor left',
  'KC_MS_R' : 'mouse mouse cursor right',

  // Media
  'KC_MSTP' : 'media: stop',
  'KC_MPLY' : 'media: play',
  'KC_MPRV' : 'media: previous',
  'KC_MNXT' : 'media: next',
  'KC_VOLU' : 'increase volume',
  'KC_VOLD' : 'decrease volume',
  'KC_MUTE' : 'mute audio',

  // Web browser
  'KC_WHOM' : 'web browser: home',
  'KC_WBAK' : 'web browser: back',
  'KC_WFWD' : 'web browser: forward',
  'KC_WSTP' : 'web browser: stop',
  'KC_WREF' : 'web browser: refresh',
  'KC_WFAV' : 'web browser: favorites',
};

MODIFIERS = [
  'LSFT', // Left shift
  'RSFT', // Right shift
  'LCTL', // Left ctrl
  'RCTL', // Right ctrl
  'RALT', // Right alt
  'LALT', // Right ctrl
  'LGUI', // Left Command / Win
  'RGUI', // Right Command / Win
  'HYPR', // All modifiers
  'MEH', // All modifiers except Command / Win
  'LCAG', // Ctrl + Alt + Command / Win
  // Prefixed
  'KC_LSFT', // Left shift
  'KC_RSFT', // Right shift
  'KC_LCTL', // Left ctrl
  'KC_RCTL', // Right ctrl
  'KC_RALT', // Right alt
  'KC_LALT', // Right ctrl
  'KC_LGUI', // Left Command / Win
  'KC_RGUI', // Right Command / Win
  'KC_HYPR', // All modifiers
  'KC_MEH', // All modifiers except Command / Win
  'KC_LCAG', // Ctrl + Alt + Command / Win
];
