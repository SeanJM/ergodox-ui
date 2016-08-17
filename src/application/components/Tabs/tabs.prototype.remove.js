Tabs.prototype.remove = function (index) {
  var tab = this.elements[index];
  var styles = tab.node.document();
  var self = this;

  self.elements.splice(index, 1);

  anime({
    targets : tab.node.document.node,
    duration : 200,
    width : [tab.node.document.offset().width, 0],
    minWidth : [parseInt(styles.minWidth, 10), 0],
    marginLeft : [parseInt(styles.marginLeft, 10), -2],
    paddingLeft : [parseInt(styles.paddingLeft, 10), 0],
    paddingRight : [parseInt(styles.paddingRight, 10), 0],
    easing : 'easeOutQuad',
    opacity : [1, 0],
    elasticity : 0,
    complete : function () {
      tab.node.document.remove();
    }
  });
};
