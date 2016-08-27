Input.Search = function () {
  this.node = {
    document : el(Input)
  };

  this.node.document.append(
    el(Icon, 'search'),
    el('input', { type : 'text' })
  );
};

Component.extend(Input.Search);
