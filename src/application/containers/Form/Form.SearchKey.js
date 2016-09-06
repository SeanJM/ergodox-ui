Form.SearchKey = function () {
  var self = this;
  var omit = [
    'KC_LALT',
    'KC_RALT',
    'KC_LGUI',
    'KC_RGUI',
    'KC_LSFT',
  ];

  this.node = {
    document : el(Form)
  };

  this.keyList = [];

  this.node.category = {};

  this.target(this.node.document).append(
    this.node.search = el(Input.Search),
    this.node.list = el(Input.List, { bottom : 0 })
  );

  this.node.list.append(
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
  );

  KEYCODE.LIST.forEach(function (a, i) {
    var key;
    if (!omit.includes(a.keyCode)) {
      key = el(Key, { keyCode : a.keyCode });
      self.node.category[a.type].append(key);
      self.keyList.push(key);
    }
  });
};

Component.extend(Form.SearchKey);
