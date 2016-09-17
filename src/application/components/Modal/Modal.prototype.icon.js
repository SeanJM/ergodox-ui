Modal.prototype.icon = function (name) {
  name = name.split('-');

  this.node.document.addClass('modal--has-icon');

  this.node.body.append(
    el({ class : 'modal-icon modal-icon-' + name[0] },
      el(Icon, name.slice(1, name.length).join('-'), { init : [ 'large' ]})
    )
  );
};
