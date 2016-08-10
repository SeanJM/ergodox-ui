Tabs.prototype.add = function (tab, cb) {
  var styles;
  var width;
  var paddingLeft;
  var paddingRight;
  var marginLeft;
  var self = this;

  this.append(tab);

  styles = tab.node.document.styles();
  width = tab.node.document.offset().width;
  paddingLeft = parseInt(styles.paddingLeft, 10);
  paddingRight = parseInt(styles.paddingRight, 10);
  marginLeft = parseInt(styles.marginLeft, 10);

  tab.node.document.style.width = 0;
  tab.node.document.style.minWidth = 0;
  tab.node.document.style.marginLeft = 0;
  tab.node.document.style.paddingLeft = 0;
  tab.node.document.style.paddingRight = 0;
  tab.node.document.style.position = 'relative';

  anime({
    targets : tab.node.document.node,
    duration : 350,
    width : [0, width],
    minWidth : [0, parseInt(styles.minWidth, 10)],
    marginLeft : [0, marginLeft],
    paddingLeft : [0, paddingLeft],
    paddingRight : [0, paddingRight],
    opacity : [0, 1],
    ease : 'easeOutQuad',
    elasticity : 0,
    complete : function () {
      tab.node.document.style.width = '';
      tab.node.document.style.minWidth = '';
      tab.node.document.style.marginLeft = '';
      tab.node.document.style.paddingLeft = '';
      tab.node.document.style.paddingRight = '';
      tab.node.document.style.opacity = '';

      if (typeof cb === 'function') {
        cb();
      }
    }
  });
};
