Modal.ConfirmCancel = function (opt) {
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
    }),
    el(Button.Cancel, {
      onClick : function (e) {
        if (typeof opt.onConfirm === 'function') {
          self.node.close();
          opt.onCancel(e);
        }
      }
    })
  );

  this.node.open();
};

Component.extend(Modal.ConfirmCancel);
