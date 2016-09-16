Input.Item = function () {
  var self = this;

  this.node = {
    document : el({ class : 'input_list-item' })
  };

  this.node.document.append(
    this.node.body = el({ class : 'input_list-item_body' })
  );

  this.node.document.on('click', function () {
    if (self.selectable) {
      self.trigger('select');
    }
  });
};

Input.Item.prototype.append = function () {
  var i = 0;
  var n = arguments.length;
  var target = this.target(this.node.body);

  for (; i < n; i++) {
    target.append(arguments[i]);
    if (arguments[i] instanceof Icon) {
      this.node.document.addClass('input_list-item--icon');
    }
  }
};

Input.Item.prototype.select = function () {
  this.node.document.addClass('input_list-item--select');
};

Input.Item.prototype.deselect = function () {
  this.node.document.removeClass('input_list-item--select');
};

Component.extend(Input.Item);
