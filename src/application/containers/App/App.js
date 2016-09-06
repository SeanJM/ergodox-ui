function App() {
  var app = el(document.querySelector('#app'));

  this.node = {
    document : el({ class : 'app-container' })
  };

  this.target(this.node.document).append(
    this.node.workspace = el({ class : 'app_workspace' },
      this.node.toolbar = el(Toolbar,
        this.node.tabs = el(Tabs),
        this.node.tabAdd = el({ class : 'tab tab_add' },
          el({ class : 'tab_title' }, '+')
        )
      ),
      this.node.status = el(Status),
      this.node.layers = el(Layers)
    )
  );

  this.layers = this.node.layers.elements;
  this.node.tabs.node.document.text('');
}

App.prototype.setKeyboard = function (keyboard) {
  var self = this;

  this.macros = keyboard.macros;
  this.node.layers.load(keyboard.layers);
  this.appendTo(app);

  keyboard.layers.forEach(function (layer, i) {
    self.node.tabs.append(
      el(Tab, { title : layer.name, init : [ 'canEdit', 'canClode' ] })
    );
  });
};

App.prototype.loadLetterbox = function () {
  this.node.document.append(
    this.node.letterBox = el(LetterBox)
  );
};

App.prototype.bind = function () {
  this.bindTabs();
  this.bindLayers();
  this.bindLetterBox();
  this.node.tabs.select(0);
};

App.prototype.init = function (keyboard) {
  this.setKeyboard(keyboard);
  this.loadLetterbox();
  this.bind();
};

Component.extend(App);
