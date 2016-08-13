// Contains event listeners and reactions
var state = new Odin();

el.fn('popFadeIn', function (time, callback) {
  var self = this;
  time = time || 600;

  this.node.style.opacity = 0;

  anime({
    targets : self.node,
    duration : time,
    opacity : [0, 1],
    ease : 'easeInExpo',
  });

  anime({
    targets : self.node,
    elasticity : 400,
    ease : 'easeOutQuad',
    duration : time,
    scale : [0, 1],
    complete : callback
  });
});

el.fn('popFadeOut', function (callback) {
  var self = this;

  anime({
    targets : self.node,
    duration : 400,
    opacity : [1, 0],
    ease : 'linear'
  });

  anime({
    targets : self.node,
    ease : 'easeInExpo',
    duration : 400,
    scale : [1, 0],
    complete : callback
  });
});

el.fn('fadeOut', function () {
  var opt = {
    targets : this.node,
    opacity : [1, 0],
    elasticity : 0,
    duration : 600,
    ease : 'linear',
  };

  if (typeof arguments[0] === 'function') {
    opt.complete = arguments[0];
  } else if (typeof arguments[0] === 'number') {
    opt.duration = arguments[0];
  } else if (typeof arguments[0] === 'object') {
    _.assign(opt, arguments[0]);
  }

  if (typeof arguments[1] === 'function') {
    opt.complete = arguments[1];
  } else if (typeof arguments[1] === 'number') {
    opt.duration = arguments[1];
  } else if (typeof arguments[1] === 'object') {
    _.assign(opt, arguments[1]);
  }

  anime(opt);
});

el.fn('fadeIn', function () {
  var opt = {
    targets : this.node,
    opacity : [0, 1],
    elasticity : 0,
    duration : 600,
    ease : 'linear',
  };

  if (typeof arguments[0] === 'function') {
    opt.complete = arguments[0];
  } else if (typeof arguments[0] === 'number') {
    opt.duration = arguments[0];
  } else if (typeof arguments[0] === 'object') {
    _.assign(opt, arguments[0]);
  }

  if (typeof arguments[1] === 'function') {
    opt.complete = arguments[1];
  } else if (typeof arguments[1] === 'number') {
    opt.duration = arguments[1];
  } else if (typeof arguments[1] === 'object') {
    _.assign(opt, arguments[1]);
  }

  anime(opt);
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
