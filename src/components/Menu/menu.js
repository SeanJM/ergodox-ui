function Menu() {
  this.node = {
    document : el({ class : 'menu' })
  };
  this.node.document.append(
    this.node.content = el({ class : 'menu_content' })
  );
}

Menu.prototype.open = function () {
  var offset;

  el(document.body).append(this.node);

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
  this.node = el({ class : 'menu_item' });
};

Component.extend(Menu);
Component.extend(Menu.Item);
