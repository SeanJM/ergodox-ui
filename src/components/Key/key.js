(function () {
  function Key(opt) {
    var self = this;

    if (!opt || !opt.keyCode) {
      throw 'New \'Key\' component must have a \'keyCode\' as an option';
    }

    // Key node
    this.node = {
      document : el('div', {
        class : 'key',

        onClick : function () {
          self.trigger('click');
        },

        onMousemove : function () {
          self.trigger('mousemove');
        }
      })
    };

    this.node.document.append(
      this.node.well = el('div', { class : 'key_well '}),
        this.node.cap = el('div', { class : 'key_cap' },
        this.node.hover = el('div', { class : 'key_hover' }),
        this.node.selected = el('div', { class : 'key_select' }),
        this.node.face = el('div', { class : 'key_face' },
          el('div', { class : 'key_face_background' }),
          el('div', { class : 'key_face_plane' })
        ),

        this.node.primary = el('div', { class : 'key_primary' }),
        this.node.secondary = el('div', { class : 'key_secondary' }),
        this.node.iconPrimary = el(Icon, { class : 'key_icon key_icon-primary' }),
        this.node.iconSecondary = el(Icon, { class : 'key_icon key_icon-secondary' })
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
