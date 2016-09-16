Dialog.SelectLayer = function (opt) {
  var self = this;

  this.node = {
    document : el(Dialog, opt)
  };

  this.node.document.append(
    el(Title, lang.get('select layer')),
    this.node.form = el(Form,
      this.node.list = el(Input.List, {
        style : {
          height : 200
        }
      })
    ),
    el(Control,
      el(Button.Confirm),
      el(Button.Cancel)
    )
  );

  this.node.document.on('submit', function () {

  });

  this.node.document.on('open', function () {
    App.main.layers.forEach(function (layer) {
      self.node.list.append(
        el(Input.Item,
          { selectable : true },
          el(Icon, 'layer'),
          el(Title, layer.name)
        )
      );
    });

    self.node.form.focus();
    self.node.list.select(0);
  });

  this.node.document.open();
};

Component.extend(Dialog.SelectLayer);
