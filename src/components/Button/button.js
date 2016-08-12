function Button() {
  var self = this;

  this.node = {
    document : el({
      class : 'button',
      tabIndex : 0,

      onClick : function (e) {
        self.trigger('click');
      },

      onDoubleclick : function (e) {
        self.trigger('doubleclick');
      },

      onKeydown : function (e) {
        if (e.which === KEYCODE_ENTER) {
          self.node.document.addClass('button--active');
        }
      },

      onKeyup : function (e) {
        if (e.which === KEYCODE_ENTER) {
          self.node.document.removeClass('button--active');
          self.trigger('click');
        }
      }
    })
  };

  this.node.document.append(
    this.node.face = el({ class : 'button_face' }),
    this.node.text = el({ class : 'button_text' }),
    el({ class : 'button_active' })
  );
}

Button.Confirm = function () {
  var self = this;
  var button = el(Button, {
    class : 'button--primary',
  }, 'OK');

  Object.assign(this, button);

  this.isConfirm = true;

  button.on('click', function (e) {
    self.trigger('click', e);
  });
};

Button.Cancel = function () {
  var self = this;
  var button = el(Button, {
    class : 'button--cancel',
  }, 'Cancel');

  Object.assign(this, button);

  this.isCancel = true;

  button.on('click', function (e) {
    self.trigger('click', e);
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
