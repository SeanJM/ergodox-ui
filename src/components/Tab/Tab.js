function Tab(opt) {
  var self = this;

  this.isEditing = false;
  this.hasEdit = false;
  this.title = opt ? opt.title : false;

  this.node = {
    document : el('div', {
      class : 'tab',

      onClick : function (e) {
        self.select();
      },

      onDoubleclick : function (e) {
        if (self.hasEdit) {
          self.editStart();
        }
      }
    })
  };

  this.node.document.append(
    this.node.title = el('div', { class : 'tab_title' }, this.title)
  );
}

Component.extend(Tab);
