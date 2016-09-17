App.prototype.bindTabs = function () {
  var self = this;

  this.node.tabs.on('tabSelect', function (e) {
    var index = self.node.tabs.indexOf(e.target);
    self.node.layers.select(index);
    self.node.letterBox.select(self.node.layers.elements[index]);
  });

  this.node.tabs.on('tabEditEnd', function (e) {
    var index = self.node.tabs.indexOf(e.target);
    var layer = self.node.layers.elements[index];

    var collision = self.node.layers.elements.filter(a => (
      a.name === e.value
      && a !== layer
    ));

    if (collision.length) {
      el(Modal.ConfirmCancel, {
        text : lang.get('duplicate layer name', { name : e.value }),
        icon : 'error-layer',

        onCancel : function () {
          // The name has not been set yet
          if (!layer.name) {
            self.node.layers.remove(index);
            self.node.tabs.remove(index);
            self.node.tabs.select(index - 1);
          } else {
            // Layer has a name, set it back to it's old name
            e.target.setTitle(layer.name);
          }
        },

        onConfirm : function () {
          e.target.editStart();
        }
      });
    } else {
      layer.setName(e.value);
    }
  });

  this.node.tabs.on('tabEditInput', function (e) {
    var input = e.target.node.edit_input;
    var pos = input.select();
    var match = input.value().match(/[a-zA-Z0-9-_]+/g);

    input.value(match ? match.join('').toUpperCase().substr(0, 5) : '');
    input.select(pos[0], pos[1]);
  });

  this.node.tabs.on('tabClose', function (e) {
    var index = self.node.tabs.indexOf(e.target);
    var layer = self.node.layers.elements[index];

    e.preventDefault();

    el(Modal.ConfirmCancel, {
      text : lang.get('confirm layer delete', { name : layer.name }),
      icon : 'confirm-layer',

      onConfirm : function () {
        self.node.layers.remove(index);
        self.node.tabs.remove(index);
        self.node.tabs.select(index - 1);
      },
    });
  });

  this.node.tabs.on('tabEditCancel', function (e) {
    console.log(self.node.tabs, e.target);
    var index = self.node.tabs.indexOf(e.target);
    // If it has no title, it is a newly created tab
    if (!e.target.title) {
      self.node.layers.remove(index);
      self.node.tabs.remove(index);
      self.node.tabs.select(index - 1);
    }
  });

  this.node.tabAdd.on('click', function () {
    var tab = el(Tab);

    self.node.layers.add();
    tab.canEdit();
    tab.canClose();

    self.node.tabs.add(tab, function () {
      tab.editStart();
    });

    self.node.tabs.select(-1);
  });
};
