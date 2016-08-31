function StatusKey() {
  this.node = {
    document : el({ class : 'status_key status_key--empty' })
  };

  this.node.document.append(
    this.node.type = el({ class : 'status_key_type' }),
    this.node.value = el({ class : 'status_key_value' })
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
    document : el({ class : 'status' })
  };

  this.node.document.append(
    el({ class : 'status_container' },
      this.node.primary = el(StatusKey),
      this.node.secondary = el(StatusKey),
      this.node.longName = el({ class : 'status_key status_key--long-name' })
    )
  );
}

Status.prototype.value = function (key) {
  this.node.primary.value(key.str_sendPrimary, key.str_primary);
  this.node.secondary.value(key.str_sendSecondary, key.str_secondary);
  this.node.longName.text(key.name);
};

Component.extend(Status);
