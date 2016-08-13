Modal.Confirm = function (opt) {
  var self = this;

  this.node = el(Modal, {
    text : opt.text,
    icon : opt.icon
  });

  this.node.control(
    el(Button.Confirm, {
      onClick : function (e) {
        if (typeof opt.onConfirm === 'function') {
          // This is where form validation occurs
          opt.onConfirm(e);
        }
        if (!e.defaultPrevented) {
          self.node.close();
        }
      }
    })
  );

  this.node.open();
};

Component.extend(Modal.Confirm);
