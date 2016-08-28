ajax.get('bin/icon-01.svg')
  .then(function (a) {
    ICON_SVG = function () {
      this.node = {
        document : el('div').html(a).children()[0]
      };
    };

    Component.extend(ICON_SVG);
    App.main.init(SETTINGS.DEFAULT);
  });

App.main = el(App);
