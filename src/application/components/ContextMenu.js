function ContextMenu() {
  this.elements = [];

  this.node = {
    document : el({ class : 'context-menu' })
  };

  this.node.document.append(
    this.node.content = el({ class : 'context-menu_content' })
  );
}

Component.extend(ContextMenu);

ContextMenu.prototype.close = function () {
  var self = this;

  this.node.document.fadeOut(function () {
    self.node.document.remove();
  });

  this.trigger('close');
};

ContextMenu.prototype.open = function (coordinates) {
  var self = this;

  var documentOffset;
  var contextItemOffset;
  var close;

  this.node.document.appendTo('body');

  if (coordinates) {
    documentOffset = this.node.document.offset();
    contextOffset = this.elements[0].offset();
    this.node.document.style.left = coordinates.x - (documentOffset.width * 0.05) + 'px';
    this.node.document.style.top = coordinates.y - (contextOffset.top + (contextOffset.height / 2)) + 'px';
  }

  document.body.addEventListener('click', close = function () {
    self.close();
    document.body.removeEventListener('click', close);
  });
};

ContextMenu.prototype.append = function () {
  var i = 0;
  var n = arguments.length;
  for (; i < n; i++) {
    if (arguments[i].node.tagName === 'DIV') {
      arguments[i].addClass('context-menu_item');
      arguments[i].html(arguments[i].text());
    }
    this.elements.push(arguments[i]);
    this.node.content.append(arguments[i]);
  }
};
