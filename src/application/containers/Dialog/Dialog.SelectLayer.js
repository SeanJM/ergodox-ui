Dialog.SelectLayer = function (opt) {
  var self = this;

  this.node = {
    document : el(
      Dialog, {
        title : lang.get('select layer'),
        x : opt.x,
        y : opt.y,
      }
    )
  };

  this.node.document.append(
    this.node.list = el(
      Input.List, {
        style : { height : 200 }
      }
    )
  );

  this.node.document.on('open', function () {
    self.node.list.clear();

    App.main.layers.forEach(function (layer) {
      self.node.list.append(
        el(
          Input.Item, {
            selectable : true
          },
          el(Icon, 'layer'),
          el(Title, layer.name)
        )
      );
    });

    self.node.list.select(0);
  });

  this.node.document.open();
};

Component.extend(Dialog.SelectLayer);
