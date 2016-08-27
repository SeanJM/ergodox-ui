function App(opt) {
  var self = this;
  var app = el(document.querySelector('#app'));

  this.macros = opt.keyboard.macros;

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
    ),
    this.node.letterBox = el(LetterBox)
  );

  this.node.tabs.node.document.text('');

  this.bindTabs();
  this.bindLayers();

  this.node.layers.load(opt.keyboard.layers);
  this.appendTo(app);

  _.forEach(opt.keyboard.layers, function (layer, i) {
    self.node.tabs.append(
      el(Tab, { title : layer.name })
      .canEdit()
      .canClose()
    );
  });

  self.node.tabs.select(0);
}

Component.extend(App);
