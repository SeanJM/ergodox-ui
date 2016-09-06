(function () {
  function menu(opt) {
    var contextMenu = el(ContextMenu);

    console.log(opt.key);

    opt.key.lightOn();

    contextMenu.on('close', function () {
      opt.key.dropTarget.lightOff();
      opt.key.lightOff();
    });

    contextMenu.append(
      el({
        onClick : function () {
          opt.key.dropTarget.replaceWith(opt.key);
          opt.key.clear();
        }
      }, 'Replace'),
      el({
        onClick : function () {
          opt.key.dropTarget.replaceWith(opt.key);
        }
      }, 'Replace and Copy')
    );
    if (opt.key.isLayerToggle) {
      contextMenu.append(
        el('hr'),
        el({
          onClick : function () {
            opt.key.dropTarget.setHoldKey(opt.key);
          }
        }, 'Insert layer hold key')
      );
    } else if (opt.key.dropTarget.isHoldLayerTapKey) {
      contextMenu.append(
        el('hr'),
        el({
          onClick : function () {
            opt.key.dropTarget.setTapKey(opt.key);
          }
        }, 'Replace tap key')
      );
    } else if (opt.key.isShift && KEYCODE.SFT[opt.key.dropTarget.keyCode]) {
      contextMenu.append(
        el('hr'),
        el({
          onClick : function () {
            opt.key.dropTarget.setShift(opt.key.dropTarget);
          }
        }, 'Shift key (' + KEYCODE.SFT[opt.key.dropTarget.keyCode] + ')')
      );
    }
    contextMenu.open({
      x : opt.x,
      y : opt.y
    });
  }

  function dropOffMenu(opt) {
    var contextMenu = el(ContextMenu);

    contextMenu.on('close', function () {
      key.lightOff();
    });

    contextMenu.append(
      el({
        onClick : function () {
          opt.key.clear();
        }
      }, 'Clear')
    );

    contextMenu.open({
      x : opt.x,
      y : opt.y
    });
  }

  function targetIsLocked(opt) {
    opt.key.dropTarget.lightOff();
    el(Modal.Confirm, {
      text : lang.get('error drop target key is locked'),
      icon : 'error-layer',

      onConfirm : function () {
      }
    });
  }

  function dropKey(opt) {
    if (opt.key.dropTarget) {
      if (opt.key.dropTarget.isLocked) {
        targetIsLocked(opt);
      } else if (opt.key.dropTarget.isEmpty) {
        opt.key.dropTarget.replaceWith(key);
        opt.key.clear();
        opt.key.dropTarget.lightOff();
      } else {
        menu(opt);
      }
    } else {
      dropOffMenu(opt);
    }
  }

  window.dropKey = dropKey;
}());
