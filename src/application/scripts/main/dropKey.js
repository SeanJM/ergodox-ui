(function () {
  function menu(key, coordinates) {
    var contextMenu = el(ContextMenu);
    var targetCode = key.dropTarget.code;

    key.lightOn();

    contextMenu.on('close', function () {
      key.dropTarget.lightOff();
      key.lightOff();
    });

    if (!key.isImmutable) {
      contextMenu.append(
        el({
          onClick : function () {
            key.dropTarget.replaceWith(key);
            key.clear();
          }
        }, 'Replace')
      );
    }

    contextMenu.append(
      el({
        onClick : function () {
          key.dropTarget.replaceWith(key);
        }
      }, 'Replace and Copy')
    );

    if (key.isLayerToggle) {
      contextMenu.append(
        el('hr'),
        el({
          onClick : function () {
            key.dropTarget.setHoldKey(key);
          }
        }, 'Insert layer hold key')
      );
    } else if (key.dropTarget.isHoldLayerTapKey) {
      contextMenu.append(
        el('hr'),
        el({
          onClick : function () {
            key.dropTarget.setTapKey(key);
          }
        }, 'Replace tap key')
      );
    } else if (key.isShift && KEYCODE[targetCode].shift) {
      contextMenu.append(
        el('hr'),
        el({
          onClick : function () {
            key.dropTarget.setShift(key.dropTarget);
          }
        }, 'Shift key <span class="context-menu_item-symbol">' + KEYCODE[targetCode].shift + '</span>')
      );
    }
    contextMenu.open(coordinates);
  }

  function dropOffMenu(key, coordinates) {
    var contextMenu = el(ContextMenu);

    contextMenu.on('close', function () {
      key.lightOff();
    });

    contextMenu.append(
      el({
        onClick : function () {
          key.clear();
        }
      }, 'Clear')
    );

    contextMenu.open(coordinates);
  }

  function dropKey(key, coordinates) {
    if (key.dropTarget) {
      if (key.dropTarget.isLocked) {
        key.dropTarget.lightOff();
        el(Modal.Confirm, {
          text : lang.get('error drop target key is locked'),
          icon : 'error-layer',
        });
      } else if (key.dropTarget.isEmpty) {
        key.dropTarget.replaceWith(key);
        key.clear();
        key.dropTarget.lightOff();
      } else {
        menu(key, coordinates);
      }
    } else {
      dropOffMenu(key, coordinates);
    }
  }

  window.dropKey = dropKey;
}());
