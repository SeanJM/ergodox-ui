ajax.get('bin/ergodox_icon.svg')
  .then(function (a) {
    ICON_SVG = function () {
      this.node = {
        document : el('div').html(a).children()[0]
      };
    };

    Component.extend(ICON_SVG);

    App.main = el(App, { keyboard : SETTINGS.DEFAULT });
  });
