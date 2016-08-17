function Layers() {
  var self = this;

  this.node = {
    document : el({ class : 'layers' })
  };
  
  this.elements = [];
}

Component.extend(Layers);
