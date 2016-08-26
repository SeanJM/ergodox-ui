function LetterBox(opt) {
  this.node = {
    document : el({ class : 'letterbox' })
  };

  this.node.document.append(
    el({ class : 'letterbox_container' })
  );
}

LetterBox.prototype.offset = function () {
  return this.node.document.offset();
};

LetterBox.prototype.open = function () {
  var offset = this.offset();

  anime({
    duration : 600,
    targets : this.node.document.node,
    right : [ -offset.width, 0 ],
    easing : 'easeOutExpo'
  });
};

Component.extend(LetterBox);
