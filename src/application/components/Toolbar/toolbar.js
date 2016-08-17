function Toolbar() {
  var self = this;

  this.node = {
    document : el({ class : 'toolbar' })
  };
}

Component.extend(Toolbar);
