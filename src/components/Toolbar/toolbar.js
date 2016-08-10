function Toolbar() {
  var self = this;

  this.node = {
    document : el('div', { class : 'toolbar' })
  };
}

Component.extend(Toolbar);
