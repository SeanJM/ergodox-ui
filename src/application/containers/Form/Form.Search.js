Form.Search = function () {
  var self = this;

  this.node = {
    document : el(Form)
  };

  this.node.category = {};

  this.target(this.node.document).append(
    this.node.search = el(Input.Search),
    this.node.list = el(Input.List, { bottom : 0 })
  );

  this.node.list.append(
    this.node.category.function = el(Category, 'Function'),
    this.node.category.numbers = el(Category, 'Numbers'),
    this.node.category.letters = el(Category, 'Letters'),
    this.node.category.punctuation = el(Category, 'Punctuation'),
    this.node.category.navigation = el(Category, 'Navigation'),
    this.node.category.editing = el(Category, 'Editing'),
    this.node.category.command = el(Category, 'Command'),
    this.node.category.media = el(Category, 'Media'),
    this.node.category.mouse = el(Category, 'Mouse'),
    this.node.category.symbols = el(Category, 'Symbols'),
    this.node.category.special = el(Category, 'Special')
  );

  KEYCODE.LIST.forEach(function (a, i) {
    var target = '';

    if (i < 3) {
      target = 'special';
    } else if (i < 15) {
      target = 'function';
    } else if (i < 25) {
      target = 'numbers';
    } else if (i < 51) {
      target = 'letters';
    } else if (i < 80) {
      target = 'punctuation';
    } else if (i < 89) {
      target = 'navigation';
    } else if (i < 94) {
      target = 'editing';
    } else if (i < 106) {
      target = 'command';
    } else if (i < 116) {
      target = 'media';
    } else if (i < 126) {
      target = 'mouse';
    } else {
      target = 'symbols';
    }

    self.node.category[target].append(
      el(Key, { keyCode : a })
    );
  });

  console.log(App.main);
};

Component.extend(Form.Search);
