function Category() {
  var self = this;

  this.node = {
    document : el({ class : 'category' })
  };

  this.node.document.append(
    this.node.title = el({ class : 'category_title' },
      this.node.arrow = el({ class : 'category_trigger' }),
      this.node.text = el({ class : 'category_text' })
    ),
    this.node.content = el({ class : 'category_content' })
  );

  this.node.title.on('click', function () {
    self.toggle();
  });

  this.isOpen = false;
}

Category.prototype.text = function (value) {
  this.node.text.text(value);
};

Category.prototype.open = function () {
  this.isOpen = true;
  this.node.document.addClass('category--open');
  this.node.content.slidedown();
};

Category.prototype.close = function () {
  this.isOpen = false;
  this.node.content.slideup();
  this.node.document.removeClass('category--open');
};

Category.prototype.toggle = function () {
  if (this.isOpen) {
    this.close();
  } else {
    this.open();
  }
};

Category.prototype.append = function () {
  var i = 0;
  var n = arguments.length;
  var target = this.target(this.node.content);

  for (; i < n; i++) {
    target.append(arguments[i]);
  }
};

Component.extend(Category);
