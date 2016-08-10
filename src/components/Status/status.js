function StatusKey() {
  this.node = {
    document : el('div', { class : 'status_key status_key--empty' })
  };

  this.node.document.append(
    this.node.type = el('div', { class : 'status_key_type' }),
    this.node.value = el('div', { class : 'status_key_value' })
  );
}

StatusKey.prototype.value = function (type, value) {
  if (type && value) {
    this.node.document.removeClass('status_key--empty');
  } else {
    this.node.document.addClass('status_key--empty');
  }

  this.node.type.text(type || '');
  this.node.value.text(value || '');
};

Component.extend(StatusKey);

function Status () {
  this.node = {
    document : el('div', { class : 'status' })
  };

  this.node.document.append(
    el('div', { class : 'status_container' },
      this.node.primary = el(StatusKey),
      this.node.secondary = el(StatusKey),
      this.node.longName = el('div', { class : 'status_key status_key--long-name' })
    )
  );
}

Status.prototype.value = function (a) {
  this.node.primary.value(a.str_sendPrimary, a.str_primary);
  this.node.secondary.value(a.str_sendSecondary, a.str_secondary);
  this.node.longName.text(a.str_longName);
};

Component.extend(Status);
