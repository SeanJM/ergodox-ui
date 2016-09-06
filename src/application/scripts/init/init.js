Promise.all(
  [
    ajax.get('bin/icon_keys.svg')
  ]
)
  .then(function (res) {
    ICON_KEYS = function () {
      this.node = {
        document : el('div').html(res[0]).children()[0]
      };
    };

    Component.extend(ICON_KEYS);
    App.main.init(SETTINGS.DEFAULT);
  });

App.main = el(App);
