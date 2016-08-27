Form.Search = function () {
  this.node = {
    document : el(Form)
  };

  this.target(this.node.document).append(
    el(Input.Search),
    el(Input.CategoryList, {
      bottom : 0
    })
  );
};

Component.extend(Form.Search);
