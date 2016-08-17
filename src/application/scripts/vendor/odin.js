function Odin(opt) {
  this.history = [];
  this.singleton = opt || {};
  this.subscriber = {};
}

Odin.prototype.path = function(path) {
  return Array.isArray(path)
    ? path.join('.').split('.')
    : path.split('.');
};

Odin.prototype.set = function (path, value) {
  var p = this.path(path);
  var v = this.get(p.slice(0, -1));
  this.trigger(p, value);
  v[p.slice(-1)] = value;
};

Odin.prototype.get = function (path) {
  var x = this.singleton;

  path = path.split('.');

  for (var i = 0, n = path.length; i < n; i++) {
    if (typeof x[path[i]] === 'undefined') {
      x[path[i]] = {};
    }
    x = x[path[i]];
  }

  return x;
};

Odin.prototype.trigger = function (path, value) {
  if (Array.isArray(this.subscriber[path])) {
    this.subscriber[path].forEach(function (callback) {
      callback(value);
    });
  }
};

Odin.prototype.on = function (path, callback) {
  if (typeof this.subscriber[path] === 'undefined') {
    this.subscriber[path] = [];
  }
  this.subscriber[path].push(callback);
};

Odin.prototype.off = function (path, callback) {
  var i = this.subscriber[path].indexOf(callback);

  while (i > -1) {
    this.subscriber[path].splice(i, 1);
    i = this.subscriber[path].indexOf(callback);
  }

  if (typeof callback === 'undefined') {
    this.subscriber[path] = [];
  }
};
