Tabs.prototype.append = function () {
  var self = this;

  [].forEach.call(arguments, function (a, i) {
    Component.prototype.append.call(self, a);

    a.on('tabSelect', function (e) {
      self.trigger('tabSelect', e);
    });

    a.on('tabClose', function (e) {
      self.trigger('tabClose', e);
    });

    a.on('tabEditStart', function (e) {
      self.trigger('tabEditStart', e);
    });

    a.on('tabEditCancel', function (e) {
      self.trigger('tabEditCancel', e);
    });

    a.on('tabEditEnd', function (e) {
      self.trigger('tabEditEnd', e);
    });

    a.on('tabEditInput', function (e) {
      self.trigger('tabEditInput', e);
    });
  });
};
