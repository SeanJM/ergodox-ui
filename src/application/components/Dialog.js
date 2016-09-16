function Dialog(opt) {
  var self = this;

  this.node = {
    document : el({ class : 'dialog' })
  };

  this.node.document.append(
    this.node.head = el({ class : 'dialog_head' }),
    this.node.body = el({ class : 'dialog_body' }),
    this.node.feet = el({ class : 'dialog_feet' })
  );

  this.on('open', function () {
    var y = window.innerHeight / 2;
    var x = window.innerWidth / 2;

    this.node.document.appendTo(document.body);

    if (opt && opt.x && opt.y) {
      y = opt.y;
      x = opt.x;
    }

    this.node.document.style.top = (
      y - (this.node.document.offset().height / 2)
    ) + 'px';

    this.node.document.style.left = (
      x - (this.node.document.offset().width / 2)
    ) + 'px';
  });

  this.node.head.on('dragmove', function (e) {
    self.node.document.style.transform = [
      'translateX(' + e.detail.distanceX + 'px)',
      'translateY(' + e.detail.distanceY + 'px)'
    ].join(' ');
  });
}

Dialog.prototype.append = function () {
  var i = 0;
  var n = arguments.length;

  for (; i < n; i++) {
    if (arguments[i] instanceof Form) {
      this.node.body.append(arguments[i]);
    } else if (arguments[i] instanceof Control) {
      this.node.feet.append(arguments[i]);
    } else if (arguments[i] instanceof Title) {
      this.node.head.append(arguments[i]);
    }
  }
};

Dialog.prototype.open = function () {
  this.trigger('open');
};

Component.extend(Dialog);
