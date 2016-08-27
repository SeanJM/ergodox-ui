Input.CategoryList = function () {
  var self = this;

  this.node = {
    document : el(Input)
  };

  this.node.document.append(
    el({ class : 'input_list' })
  );

  this.style = this.node.document.style;

  this.on('mount', function () {
    self.node.document.trigger('mount');
  });
};

Component.extend(Input.CategoryList);
