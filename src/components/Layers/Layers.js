function Layers() {
  var self = this;

  this.node = {
    document : el('div', { class : 'layers' })
  };
  
  this.elements = [];
}

Component.extend(Layers);
