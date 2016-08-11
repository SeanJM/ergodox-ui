function Menu() {
  this.node = {
    document : el({ class : 'menu' })
  };
  this.node.document.append(
    this.node.content = el({ class : 'menu_content' })
  );
}

Component.extend(Menu);

Menu.prototype.open = function () {
  var offset;

  console.log('open');

  this.node.document.appendTo('body');

  if (this.openTarget) {
    offset = this.openTarget.offset();
    this.node.document.style.left = offset.left + 'px';
    this.node.document.style.top = offset.top + 'px';
  }
};


Menu.prototype.target = function (target) {
  this.openTarget = target;
};

Menu.prototype.append = function () {
  var i = 0;
  var n = arguments.length;

  for (; i < n; i++) {
    this.node.content.append(arguments[i]);
  }
};

Menu.Item = function () {
  this.node = {
    document : el({ class : 'menu_item' })
  };

  this.node.document.append(
    this.node.text = el({ class : 'menu_item-text' })
  );
};

Component.extend(Menu.Item);

Menu.Item.prototype.text = function (value) {
  this.node.text.text(value);
};
