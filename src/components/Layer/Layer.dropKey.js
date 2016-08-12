Layer.dropKey = function (key, coordinates) {
  var contextMenu = el(ContextMenu);

  if (key.dropTarget.isEmpty) {
    key.dropTarget.replaceWith(key);
    key.clear();
  } else {
    key.lightOn();

    contextMenu.on('close', function () {
      key.dropTarget.lightOff();
      key.lightOff();
    });

    contextMenu.append(
      el({
        onClick : function () {
          key.dropTarget.replaceWith(key);
          key.clear();
        }
      }, 'Replace'),
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
        }, 'Replace layer hold key')
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
    }
    contextMenu.open(coordinates);
  }
};
