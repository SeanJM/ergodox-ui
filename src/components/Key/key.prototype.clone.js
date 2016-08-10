Key.prototype.clone = function () {
  var clone = new Key({ keyCode : this.keyCode });

  clone.node.document.removeClass('key--giant');
  clone.node.document.removeClass('key--tall');

  clone.node.document.style.position = 'absolute';
  clone.node.document.style.zIndex = 2;
  clone.node.document.style.left = '0';
  clone.node.document.style.top = '0';

  return clone;
};
