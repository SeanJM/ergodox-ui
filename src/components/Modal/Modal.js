function Modal() {
  this.node = {
    document : el({ class : 'modal' })
  };

  this.node.document.append(
    this.node.window = el({ class : 'modal_window' },
      this.node.chrome = el({ class : 'modal_chrome' },
        this.node.body = el({ class : 'modal_body' },
          this.node.content = el({ class : 'modal_content' })
        ),
        this.node.feet = el({ class : 'modal_feet' },
          this.node.control = el(Control, { class : 'modal_control' })
        )
      )
    )
  );
}

Modal.prototype.text = function (v) {
  var node = el('p', { class : 'modal_text' });

  node.html(tinyMarkdown(v));

  this.node.content.append(node);
};

Modal.prototype.append = function () {
  var i = 0;
  var n = arguments.length;

  for (; i < n; i++) {
    if (arguments[i] instanceof Control) {
      this.node.feet.append(arguments[i]);
    } else {
      this.node.body.append(arguments[i]);
    }
  }
};

Modal.prototype.control = function () {
  var self = this;
  var n = arguments.length;
  var i = 0;

  function close() {
    self.close();
  }

  for (; i < n; i++) {
    arguments[i].addClass('modal_button');
    this.node.control.append(arguments[i]);
    if (
      arguments[i] instanceof Button.Confirm
      || arguments[i] instanceof Button.Cancel
    ) {
      arguments[i].on('click', close);
    }
  }
};

Modal.prototype.icon = function (name) {
  if (typeof this.node.icon === 'undefined') {
    this.node.document.addClass('modal--has-icon');

    this.node.body.append(
      this.node.icon = el(IconLarge, name)
    );
  } else {
    this.node.icon.node.className = this.node.icon.node.className.replace(/icon-large--[a-z\-]+/g, name);
  }

};

Modal.prototype.open = function () {
  var self = this;

  var contentHeight;
  var bodyHeight;
  var winHeight;

  this.node.document.node.style.opacity = 0;
  this.node.document.appendTo(document.body);
  this.node.control.focus();

  contentHeight = this.node.content.offset().height;
  bodyHeight = this.node.body.offset().height;
  winHeight = this.node.window.offset().height;

  this.node.content.style.paddingTop = (bodyHeight / 2) - (contentHeight / 2) + 'px';

  this.node.document.fadeIn(1000);

  anime({
    targets : this.node.window.node,
    top : [winHeight * -1.2, 0],
    delay : 300,
    duration : 600,
    elasticity : 100,
    ease : 'easeInQuart'
  });

  document.body.addEventListener('keydown', this.cancelListener = function (e) {
    if (e.which === KEYCODE_ESC) {
      if (self.node_control.cancel) {
        self.node_control.cancel.trigger('click');
      }
      self.close();
    }
  });

  Modal.isOpen = true;
};

Modal.prototype.close = function () {
  document.body.removeEventListener('keydown', this.cancelListener);
  Modal.isOpen = false;
  this.node.document.remove();
};

Modal.isOpen = false;
