function Button() {
  var self = this;

  this.node = {
    document : el({
      class : 'button',
      tabIndex : 0,
    })
  };

  this.node.document.append(
    this.node.face = el({ class : 'button_face' }),
    this.node.text = el({ class : 'button_text' })
  );

  this.node.document.on('click', function (e) {
    self.trigger('click');
  });

  this.node.document.on('doubleclick', function (e) {
    self.trigger('doubleclick');
  });

  this.node.document.on('keydown', function (e) {
    if (e.which === KEYCODE_ENTER) {
      self.node.document.addClass('button--active');
    }
  });

  this.node.document.on('keyup', function (e) {
    if (e.which === KEYCODE_ENTER) {
      self.node.document.removeClass('button--active');
      self.trigger('click');
    }
  });
}

Button.Confirm = function () {
  var self = this;

  var button = el(Button, {
    class : 'button--primary',
  }, lang.get('button ok'));

  this.isConfirm = true;

  _.assign(this, button);

  button.on('click', function (e) {
    self.trigger('confirm', e);
  });
};

Button.Cancel = function () {
  var self = this;
  var button = el(Button, {
    class : 'button--cancel',
  }, lang.get('button cancel'));

  this.isCancel = true;

  _.assign(this, button);

  button.on('click', function (e) {
    self.trigger('cancel', e);
  });
};

Button.prototype.text = function (text) {
  this.node.text.text(text);
};

Button.prototype.select = function () {
  this.node.document.addClass('button--select');
};

Button.prototype.deselect = function () {
  this.node.document.removeClass('button--select');
};

Button.prototype.focus = function () {
  this.node.document.focus();
};

Component.extend(Button);

Button.Confirm.prototype = Button.prototype;
Button.Cancel.prototype = Button.prototype;
