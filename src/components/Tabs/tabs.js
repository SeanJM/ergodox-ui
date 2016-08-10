function Tabs() {
  var self = this;

  this.node = {
    document : el('div', { class : 'tabs' })
  };

  this.selected = false;
  this.elements = [];

  self.on('tabSelect', function (e) {
    if (self.selected && self.selected !== e.target) {
      self.selected.deselect();
    }
    self.selected = e.target;
  });
}

Component.extend(Tabs);
