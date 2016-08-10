// Contains event listeners and reactions
var state = new Odin();

el.fn('fadeOut', function () {
  var time;
  var callback;

  if (typeof arguments[0] === 'function') {
    callback = arguments[0];
  } else if (typeof arguments[0] === 'number') {
    time = arguments[0];
  }

  if (typeof arguments[1] === 'function') {
    callback = arguments[1];
  } else if (typeof arguments[1] === 'number') {
    time = arguments[1];
  }

  anime({
    targets : this.node,
    opacity : [1, 0],
    elasticity : 0,
    duration : time || 300,
    ease : 'easeOutQuad',
    complete : callback
  });
});

el.fn('fadeIn', function () {
  var time;
  var callback;

  if (typeof arguments[0] === 'function') {
    callback = arguments[0];
  } else if (typeof arguments[0] === 'number') {
    time = arguments[0];
  }

  if (typeof arguments[1] === 'function') {
    callback = arguments[1];
  } else if (typeof arguments[1] === 'number') {
    time = arguments[1];
  }

  anime({
    targets : this.node,
    opacity : [0, 1],
    elasticity : 0,
    duration : time || 300,
    ease : 'easeOutQuad',
    complete : callback
  });
});

el.fn('matrixRotation', function () {
  var matrix = this.styles().transform;

  var parent = this.parentsUntil(function (p) {
    return /^matrix/.test(window.getComputedStyle(p).transform);
  });

  matrix = /matrix/.test(matrix) && !parent
  ? matrix
  : parent
  ? parent.styles().transform
  : false;

  return matrix
  ? Math.round(
    Math.asin(matrix.split('(')[1].split(')')[0].split(',').map(Number)[1]) * (180 / Math.PI)
  )
  : 0;
});

App.main = el(App, { keyboard : settings.default });
