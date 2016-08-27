function LetterBox(opt) {
  this.isOpen = false;

  this.node = {
    document : el({ class : 'letterbox' })
  };

  this.node.document.append(
    this.node.container = el({ class : 'letterbox_container' })
  );

  this.target(this.node.container).append(
    this.node.search = el(Form.Search)
  );
}

LetterBox.prototype.offset = function () {
  return this.node.document.offset();
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
};

Component.extend(LetterBox);
