function LetterBox(opt) {
  var self = this;
  var omit = [
    'KC_LALT',
    'KC_RALT',
    'KC_LGUI',
    'KC_RGUI',
    'KC_LSFT',
  ];

  this.isOpen = false;
  this.keyList = [];

  this.node = {
    document : el({ class : 'letterbox' }),
    category : {}
  };

  this.node.document.append(
    this.node.trigger = el({ class : 'letterbox_trigger'},
      el(Icon, 'menu'),
      el({ class : 'letterbox_label' }, 'Key Caps')
    ),
    this.node.container = el({ class : 'letterbox_container' },
      this.node.form = el(Form,
        this.node.search = el(Input.Search),
        this.node.list = el(Input.List, { bottom : 0 },
          this.node.category.function = el(Category, 'Function'),
          this.node.category.number = el(Category, 'Number'),
          this.node.category.letter = el(Category, 'Letter'),
          this.node.category.punctuation = el(Category, 'Punctuation'),
          this.node.category.navigation = el(Category, 'Navigation'),
          this.node.category.editing = el(Category, 'Editing'),
          this.node.category.command = el(Category, 'Command'),
          this.node.category.media = el(Category, 'Media'),
          this.node.category.web = el(Category, 'Web'),
          this.node.category.mouse = el(Category, 'Mouse'),
          this.node.category.application = el(Category, 'Application'),
          this.node.category.quantum = el(Category, 'Quantum'),
          this.node.category.special = el(Category, 'Special'),
          this.node.category.computer = el(Category, 'Computer')
        )
      )
    )
  );

  KEYCODE.LIST.forEach(
    function (a, i) {
      var key;
      if (!omit.includes(a.code)) {

        key = el(Key, {
          code : a.code,
          isImmutable : true,
          onMouseenter : function (e) {
            self.trigger('keyhover', e);
          },
        });

        self.node.category[a.type].append(key);
        self.keyList.push(key);
      }
    }
  );

  this.node.trigger.on('click', function () {
    self.toggle();
  });

  this.elements = [
    this.node.form
  ];
}

LetterBox.prototype.offset = function () {
  return this.node.document.offset();
};

LetterBox.prototype.toggle = function () {
  if (this.isOpen) {
    this.close();
  } else {
    this.open();
  }
  return this;
};

LetterBox.prototype.open = function () {
  var offset = this.offset();
  var self = this;

  this.isOpen = true;

  anime({
    duration : 600,
    targets : this.node.document.node,
    right : [ -offset.width, 0 ],
    easing : 'easeOutExpo',
    complete : function () {
      self.node.search.focus();
    }
  });

  this.trigger('open');
};

LetterBox.prototype.close = function () {
  var offset = this.offset();
  var self = this;

  this.isOpen = false;

  anime({
    duration : 600,
    targets : this.node.document.node,
    right : [ -offset.width ],
    easing : 'easeOutExpo'
  });

  this.trigger('close');
};

LetterBox.prototype.select = function (layer) {
  this.keyList.forEach(function (key) {
    setDragKey(key, layer.keyList);
  });
};

Component.extend(LetterBox);
