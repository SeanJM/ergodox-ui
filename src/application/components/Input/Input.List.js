Input.List = function () {
  var self = this;

  this.node = {
    document : el(Input)
  };

  this.node.document.append(
    this.node.list = el({ class : 'input_list' })
  );

  this.style = this.node.document.style;

  this.on('mount', function () {
    self.node.document.trigger('mount');
  });
};

Input.List.prototype.append = function () {
  var i = 0;
  var n = arguments.length;
  var target = this.target(this.node.list);
  for (; i < n; i++) {
    target.append(arguments[i]);
  }
};

Component.extend(Input.List);
