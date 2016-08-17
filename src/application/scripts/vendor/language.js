function Language(name) {
  this.list = {};
}

Language.prototype.set = function (label, value) {
  this.list[label] = value;
};

Language.prototype.get = function (label, template) {
  var self = this;

  var value = this.list[label] && this.list[label].length
    ? this.list[label]
    : label;

  if (typeof template === 'object') {
    return value.replace(/\{\{([^\}]+)\}\}/g, function (a, b) {
      var split = b.split(' ');

      if (typeof self[split[0]] === 'function') {
        split[1] = template.hasOwnProperty(split[1])
          ? template[split[1]]
          : split[1];

        return Language.prototype[split[0]].apply(self, split.slice(1));
      }

      return template.hasOwnProperty(b)
        ? template[b]
        : b;
    });
  }

  return value;
};

Language.prototype.ellipsis = function (s, l) {
  return s.length > l ? s.substr(0, l) + '...' : s;
};
