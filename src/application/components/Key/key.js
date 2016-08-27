(function () {
  function Key(opt) {
    var self = this;

    if (!opt || !opt.keyCode) {
      throw 'New \'Key\' component must have a \'keyCode\' as an option';
    }

    // Key node
    this.node = {
      document : el({
        class : 'key',

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
        this.node.selected = el({ class : 'key_select' }),
        this.node.face = el({ class : 'key_face' },
          el({ class : 'key_face_background' }),
          el({ class : 'key_face_plane' })
        ),

        this.node.primary = el({ class : 'key_primary' }),
        this.node.secondary = el({ class : 'key_secondary' })
      )
    );

    this.node.document.on('dragstart, dragmove, dragend', function (e) {
      self.trigger(e.type, e);
    });

    this.keyCodeObject(opt.keyCode);
    this.draw();
    this.style = this.node.document.style;
  }

  Component.extend(Key);

  window.Key = Key;
}());
