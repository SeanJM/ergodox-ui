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
    duration : 300,
    easing : 'linear',
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
    duration : 300,
    easing : 'linear',
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

el.fn('slidedown', function () {
  var self = this;
  var height;

  this.style.position = 'absolute';
  this.style.opacity = 0;

  if (this.styles().display === 'none') {
    this.node.display = '';
  }

  height = this.offset().height;
  this.style.position = 'static';

  anime({
    targets : this.node,
    height : [ 0, height ],
    easing : 'easeOutQuad',
    duration : 200,
    complete : function () {
      self.node.style.height = '';
    }
  });

  anime({
    duration : 200,
    targets : this.node,
    opacity : [ 1 ],
    easing : 'linear'
  });
});

el.fn('slideup', function () {
  var height;
  var self = this;

  this.style.height = '';

  height = this.offset().height;

  this.style.display = 'block';

  anime({
    duration : 200,
    targets : this.node,
    height : [ height, 0 ],
    easing : 'easeOutQuad',
    complete : function () {
      self.style.display = '';
      self.style.height = '';
    }
  });

  anime({
    duration : 150,
    targets : this.node,
    opacity : [ 0 ],
    easing : 'linear'
  });
});
