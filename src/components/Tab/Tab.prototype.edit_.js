Tab.prototype.editStart = function () {
  var self = this;

  this.isEditing = true;

  this.node.document.addClass('tab--edit');
  this.node.edit_input.value(this.title || '');
  this.node.edit_input.select(-1);

  this.node.edit.fadeIn();
  this.node.close.fadeOut(500);
  this.node.title.fadeOut(500);

  this.trigger('tabEditStart');

  return this;
};

Tab.prototype.editCancel = function () {
  var self = this;

  if (this.isEditing) {
    this.isEditing = false;

    self.node.edit.fadeOut(500, function () {
      self.node.document.removeClass('tab--edit');
    });

    this.node.close.fadeIn(500);
    this.node.title.fadeIn(500);

    this.node.title.text(self.title || '');

    this.trigger('tabEditCancel');
  }

  return this;
};

Tab.prototype.editEnd = function () {
  var self = this;
  var value = this.node.edit_input.value().trim();

  this.isEditing = false;

  this.node.edit.fadeOut(500, function () {
    self.node.document.removeClass('tab--edit');
  });

  this.node.close.fadeIn(500);
  this.node.title.fadeIn(500);

  this.title = value;

  this.trigger('tabEditEnd', { value : value });

  return this;
};

Tab.prototype.editValue = function () {
  if (this.node.edit_input.value().trim().length) {
    this.node.title.text(this.node.edit_input.value().trim());
  }

  return this;
};

Tab.prototype.canEdit = function (opt) {
  var self = this;

  this.hasEdit = true;

  this.node.edit = el('div', { class : 'tab_edit' },
    this.node.edit_input = el('input', {
      class : 'tab_edit_input',
      type : 'text',

      onKeyup : function (e) {
        if (e.which === KEYCODE_ENTER) {
          self.editEnd();
        }
      },

      onInput : function (e) {
        self.trigger('tabEditInput', {
          target : self.node.edit_input
        });
        self.editValue();
      }
    })
  );

  this.node.document.append(this.node.edit);

  document.body.addEventListener('keydown', function (e) {
    if (self.isEditing && e.which === KEYCODE_ESC) {
      self.editCancel();
    }
  });

  document.body.addEventListener('click', function (e) {
    if (
      self.isEditing
      && !self.node.document.contains(e.target)
      && self.node.document.node !== e.target
      && !e.target.closest('.modal')
    ) {
      self.editCancel();
    }
  });

  return this;
};
