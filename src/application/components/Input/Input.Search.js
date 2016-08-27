Input.Search = function () {
  var self = this;

  this.node = {
    document : el(Input)
  };

  this.node.document.append(
    el(Icon, 'search'),
    el('input', { type : 'text' })
  );

  this.on('mount', function () {
    self.node.document.trigger('mount');
  });
};

Component.extend(Input.Search);
