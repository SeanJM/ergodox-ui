function Title() {
  this.node = {
    document : el('h1')
  };
}

Component.extend(Title);

Title.prototype.text = function (value) {
  this.node.document.text(value);
};
