Input.List = function (opt) {
  var self = this;

  this.node = {
    document : el(Input)
  };

  this.list = [];

  this.node.document.append(
    this.node.list = el(
      {
        class : 'input_list',
        tabIndex : 0
      },
      opt
    )
  );

  this.on('mount', function () {
    self.node.document.trigger('mount');
  });
};

Input.List.prototype.select = function (n) {
  this.selectedIndex = n;
  this.list[n].select();
  this.list
    .filter((a, i) => i !== n)
    .forEach(a => a.deselect());
};

Input.List.prototype.clear = function () {
  if (this.elements) {
    this.elements = this.elements.filter(a => this.list.indexOf(a) > -1);
    this.node.list.html('');
  }
};

Input.List.prototype.append = function () {
  var i = 0;
  var n = arguments.length;
  var target = this.target(this.node.list);
  var self = this;

  function select(e) {
    self.select(self.list.indexOf(this));
  }

  for (; i < n; i++) {
    target.append(arguments[i]);
    if (arguments[i] instanceof Input.Item) {
      this.list.push(arguments[i]);
      arguments[i].on('select', select);
    }
  }

};

Component.extend(Input.List);
