(function () {
  function Key(opt) {
    var self = this;

    if (!opt || !opt.keyCode) {
      throw 'New \'Key\' component must have a \'keyCode\' as an option';
    }

    // Key node
    this.node = {
      document : el({
        class : 'key key--' + (IS_MACINTOSH ? 'mac' : 'win'),

        onClick : function () {
          self.trigger('keyClick');
        },

        onMousemove : function () {
          self.trigger('mousemove');
        }
      })
    };

    this.node.document.append(
      this.node.well = el({ class : 'key_well '}),
      this.node.cap = el({ class : 'key_cap' },
        this.node.hover = el({ class : 'key_hover' }),
        this.node.face = el({ class : 'key_face' },
          el({ class : 'key_face_background' }),
          el({ class : 'key_face_plane' })
        ),

        this.node.primary = el(Key.Letter, { class : 'key_primary' }),
        this.node.secondary = el(Key.Letter, { class : 'key_secondary' })
      )
    );

    // Is not appended yet
    this.node.icon = el(Icon, { class : 'key_icon' });

    this.node.document.on('dragstart, dragmove, dragend', function (e) {
      self.trigger(e.type, e);
    });

    this.node.primary.on('insert', function () {
      self.node.document.addClass('key--has-primary-text');
    });

    this.node.primary.on('clear', function () {
      self.node.document.removeClass('key--has-primary-text');
    });

    this.node.secondary.on('insert', function () {
      self.node.document.addClass('key--has-secondary-text');
    });

    this.node.secondary.on('clear', function () {
      self.node.document.removeClass('key--has-secondary-text');
    });

    this.node.icon.on('clear', function () {
      self.node.document.removeClass('key--has-icon');
    });

    this.node.icon.on('insert', function () {
      self.node.document.addClass('key--has-icon');
    });

    this.node.document.on('mouseenter', function () {
      console.log(self);
    });

    this.keyCodeObject(opt.keyCode);
    this.draw();
    this.style = this.node.document.style;
  }

  Key.Letter = function () {
    this.node = { document : el() };
  };

  Key.Letter.prototype.text = function (value) {
    if (value.length) {
      this.trigger('insert');
    } else {
      this.trigger('clear');
    }
    this.node.document.text(value);
  };

  Component.extend(Key);
  Component.extend(Key.Letter);

  window.Key = Key;
}());
