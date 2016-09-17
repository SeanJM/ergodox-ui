function Dialog(opt) {
  var self = this;

  this.node = {
    document : el({ class : 'dialog' })
  };

  this.node.document.append(
    this.node.head = el({ class : 'dialog_head' },
      this.node.title = el(Title)
    ),
    this.node.body = el({ class : 'dialog_body' },
      this.node.form = el(Form)
    ),
    this.node.feet = el({ class : 'dialog_feet' },
      this.node.control = el(Control,
        el(Button.Confirm),
        el(Button.Cancel)
      )
    )
  );

  this.on('open', function () {
    var y = this.y || (window.innerHeight / 2);
    var x = this.x || (window.innerWidth / 2);
    var o = this.node.document.offset();

    this.node.document.style({
      top : y - (o.height / 2),
      left : x - (o.width / 2)
    });

    this.node.form.focus();
  });

  this.node.head.on('dragmove', function (e) {
    self.node.document.style({
      transform : {
        translateX : e.detail.distanceX,
        translateY : e.detail.distanceY
      }
    });
  });
}

Dialog.prototype.append = function () {
  var i = 0;
  var n = arguments.length;

  for (; i < n; i++) {
    if (arguments[i] instanceof Title) {
      this.node.head.append(arguments[i]);
    } else {
      this.node.form.append(arguments[i]);
    }
  }
};

Dialog.prototype.open = function (opt) {
  this.node.document.appendTo(document.body);
  this.trigger('open', opt);
};

Dialog.prototype.title = function (value) {
  this.node.title.text(value);
};

Component.extend(Dialog);
