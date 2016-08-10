function TabAdd() {
  var self = this;

  this.node = {
    document : el('div', {
      class : 'tab tab_add',

      onClick : function () {
        self.trigger('click');
      }
    })
  };

  this.node.document.append(
    el('div', { class : 'tab_left-corner' }),
    el('div', { class : 'tab_right-corner' }),
    el('div', { class : 'tab_title' }, '+')
  );
}

Component.extend(TabAdd);
