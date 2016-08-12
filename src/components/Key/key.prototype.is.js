Key.prototype.is = function (type) {
  var keys = _.keys(KEYCODE);

  if (keys.indexOf(type) === -1) {
    throw 'Invalid type \'' + type + '\', valid types are: \'' + keys.join(', ') + '\'';
  }

  for (var k in KEYCODE) {
    if (k.substr(0, 2) === 'is') {
      this[k] = false;
    }
  }

  this[type] = true;
};
