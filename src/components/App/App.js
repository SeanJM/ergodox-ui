function App(opt) {
  var self = this;
  var app = el(document.querySelector('#app'));

  this.macros = opt.keyboard.macros;

  this.node = {
    document : el('div', { class : 'app-container' })
  };

  this.node.document.append(
    this.node.layers = el(Layers),
    this.node.toolbar = el(Toolbar,
      this.node.tabs = el(Tabs),
      this.node.tabAdd = el(TabAdd)
    ),
    this.node.status = el(Status)
  );

  this.node.tabs.node.document.text('');

  this.node.tabs.on('tabSelect', function (e) {
    self.node.layers.select(self.node.tabs.indexOf(e.target));
  });

  this.node.tabs.on('tabEditEnd', function (e) {
    var index = self.node.tabs.indexOf(e.target);
    var layer = self.node.layers.elements[index];

    var collision = self.node.layers.elements.filter(function (a) {
      return (
        a.name === e.value
        && a !== layer
      );
    });

    if (collision.length) {
      el(Modal.ConfirmCancel, {
        text : lang.get('duplicate layer name', { name : e.value }),
        icon : 'error-layer',

        onCancel : function () {
          // The name has not been set yet
          if (!layer.name) {
            self.node.layers.remove(e.index);
            self.node.tabs.remove(e.index);
            self.node.tabs.select(e.index - 1);
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
    var pos = e.target.select();
    var match = e.target.value().match(/[a-zA-Z0-9-_]+/g);

    e.target.value(match ? match.join('').toUpperCase().substr(0, 5) : '');
    e.target.select(pos[0], pos[1]);
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

  this.node.layers.on('keyhover', function (e) {
    self.node.status.value(e.target);
  });

  this.node.tabs.on('tabEditCancel', function (e) {
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

  _.forEach(opt.keyboard.layers, function (layer, i) {
    self.node.tabs.append(
      el(Tab, { title : layer.name })
        .canEdit()
        .canClose()
    );
  });

  this.node.layers.load(opt.keyboard.layers);
  this.node.document.appendTo(app);

  self.node.tabs.select(0);
}

Component.extend(App);
