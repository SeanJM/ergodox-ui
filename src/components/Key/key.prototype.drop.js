Key.prototype.drop = function () {
  // Swap
  // Replace
  var m = el(Menu,
    {
      target : this.keyTarget.node.document
    },
    el(Menu.Item, {
      text : 'Swap'
    }),
    el(Menu.Item, {
      text : 'Replace'
    }),
    el(Menu.Item, {
      text : 'Tap key'
    }),
    el(Menu.Item, {
      text : 'Told key'
    })
  );
  m.open();
};
