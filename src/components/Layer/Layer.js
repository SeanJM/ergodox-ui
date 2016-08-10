(function () {
  var SIZE_WIDE = [ 0, 7, 14, 20, 44, 51, 57, 64 ];
  var SIZE_TALL = [ 26, 13, 45, 58 ];
  var SIZE_GIANT = [ 35, 36, 74, 75 ];

  var COLUMN_LEFT = [
    [ 0, 7, 14, 20 ],
    [ 1, 8, 15, 21, 28 ],
    [ 2, 9, 16, 22, 29 ],
    [ 3, 10, 17, 23, 30 ],
    [ 4, 11, 18, 24, 31 ],
    [ 5, 12, 19, 25 ],
    [ 6, 13, 26 ]
  ];

  var COLUMN_LEFT_THUMB = [
    [ 35 ],
    [ 32, 36 ],
    [ 33, 34, 37 ],
  ];

  var COLUMN_RIGHT = [
    [ 38, 45, 58 ],
    [ 39, 46, 52, 59 ],
    [ 40, 47, 53, 60, 65 ],
    [ 41, 48, 54, 61, 66 ],
    [ 42, 49, 55, 62, 67 ],
    [ 43, 50, 56, 63, 68 ],
    [ 44, 51, 57, 64, 69 ]
  ];

  var os = /Macintosh/.test(window.navigator.userAgent)
    ? 'mac'
    : 'win';

  function getColumn(index) {
    for (var i = 0, n = COLUMN_LEFT.length; i < n; i++) {
      if (COLUMN_LEFT[i].indexOf(index) > -1) {
        return 'left-' + (i + 1);
      }
    }

    for (i = 0, n = COLUMN_LEFT_THUMB.length; i < n; i++) {
      if (COLUMN_LEFT_THUMB[i].indexOf(index) > -1) {
        return 'left-thumb-' + (i + 1);
      }
    }

    for (i = 0, n = COLUMN_RIGHT.length; i < n; i++) {
      if (COLUMN_RIGHT[i].indexOf(index) > -1) {
        return 'right-' + (i + 1);
      }
    }

    return 0;
  }

  function Layer(opt) {
    var self = this;

    this.name = opt.name;
    this.keyList = [];
    this.selected = false;

    this.node = {
      document : el('div', { class : 'layer layer--' + os })
    };

    this.node.document.append(
      this.node.left = el('div', { class : 'layer_left' },
        this.node.left_fingers = el('div', { class : 'layer_side_fingers' }),
        this.node.left_thumb = el('div', { class : 'layer_side_thumb' })
      ),
      this.node.right = el('div', { class : 'layer_right' },
        this.node.right_fingers = el('div', { class : 'layer_side_fingers' }),
        this.node.right_thumb = el('div', { class : 'layer_side_thumb' })
      )
    );
  }

  Layer.prototype.keys = function (keys) {
    var self = this;

    _.forEach(keys, function (keyCode, i) {
      // Outside keys
      self.keyList[i] = el(Key, {
        keyCode : keyCode,

        onMousemove : function (e) {
          self.trigger('keyhover', e);
        },

        onClick : function (e) {
          if (self.selected) {
            self.selected.deselect();
          }
          e.target.select();
          self.selected = e.target;
          self.trigger('keyclick', e);
        }
      });

      if (SIZE_WIDE.indexOf(i) !== -1) {
        self.keyList[i].addClass('key--wide');
      } else if (SIZE_TALL.indexOf(i) !== -1) {
        self.keyList[i].addClass('key--tall');
      } else if (SIZE_GIANT.indexOf(i) !== -1) {
        self.keyList[i].addClass('key--giant');
      }

      self.keyList[i].addClass('key-column-' + getColumn(i));
      self.keyList[i].addClass('key-' + i);

      if (i < 32) {
        self.node.left_fingers.append(self.keyList[i]);
      } else if (i < 38) {
        self.node.left_thumb.append(self.keyList[i]);
      } else if (i < 70) {
        self.node.right_fingers.append(self.keyList[i]);
      } else {
        self.node.right_thumb.append(self.keyList[i]);
      }

      Layer.moveKey(self.keyList[i], self.keyList);
    });
  };

  Component.extend(Layer);
  window.Layer = Layer;
}());
