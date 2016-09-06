function LetterBox(opt) {
  var self = this;

  this.isOpen = false;

  this.node = {
    document : el({ class : 'letterbox' })
  };

  this.node.document.append(
    this.node.trigger = el({ class : 'letterbox_trigger'},
      el(Icon, 'menu')
    ),
    this.node.container = el({ class : 'letterbox_container' })
  );

  this.target(this.node.container).append(
    this.node.search = el(Form.SearchKey)
  );

  this.node.trigger.on('click', function () {
    self.toggle();
  });
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
  this.node.search.keyList.forEach(function (key) {
    setDragKey(key, layer.keyList);
  });
};

Component.extend(LetterBox);
