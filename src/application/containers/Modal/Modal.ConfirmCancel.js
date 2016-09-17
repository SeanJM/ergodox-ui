Modal.ConfirmCancel = function (opt) {
  var self = this;

  var modal = el(
    Modal, {
      text : opt.text,
      icon : opt.icon
    }
  );

  this.node = {
    document : modal
  };

  modal.node.control.append(
    el(Button.Confirm),
    el(Button.Cancel)
  );

  modal.node.control.on('confirm', function (e) {
    if (typeof opt.onConfirm === 'function') {
      // This is where form validation occurs
      opt.onConfirm(e);
    }

    if (!e.defaultPrevented) {
      modal.close();
    }
  });

  modal.node.control.on('cancel', function (e) {
    if (typeof opt.onCancel === 'function') {
      opt.onCancel(e);
    }

    modal.close();
  });

  modal.open();
};

Component.extend(Modal.ConfirmCancel);
