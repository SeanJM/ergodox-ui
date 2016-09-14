const marked = require('marked');
const fs = require('fs');
const path = require('path');
const m = require('match-file-utility');
const _ = require('lodash');

function set(a) {
  var b = path.basename(a).split('.').slice(0, -1).join('.');
  var target = path.resolve(a);
  var children = a.split(path.sep).slice(2, -1).concat(b);
  var exists = _.get(paths.to, children);

  if (exists) {
    throw 'Invalid filename \"' + a + '\", this is already taken by "' + exists + '"';
  } else {
    _.set(paths.to, children, target);
  }
}

function requireObject(p, object) {
  var list = {};

  for (var k in object) {
    if (typeof object[k] === 'string') {
      try {
        list[k] = require(object[k]);
      } catch(e) {
        console.log(new Error('\n  Invaild path: ' + '"' + p + '"\n  ' + object[k] + '\n  ' + e));
      }
    } else if (typeof object[k] === 'object') {
      list[k] = requireObject(p, object[k]);
    }
  }

  return list;
}

function find(seek, name) {
  var value;

  for (var k in seek) {
    if (k === name) {
      return seek[k];
    } else if (typeof seek[k] === 'object') {
      value = find(seek[k], name);
      if (value) {
        return value;
      }
    }
  }

  return false;
}

function requireFind(p) {
  try {
    require(find(path.to, p));
  } catch (e) {
    console.log('Invaild path \'' + p + '\' (' + e + ')');
  }
}

var paths = {
  to : {
    // Loaded by NodeJS
    container : {},
    component : {},
    script : {},
    text : {},
    markdown : {}
  },

  bin : {
    script : {},
    image : {}
  },

  read : function (p) {
    let path = _.get(paths.to, p);
    return path
      ? fs.readFileSync(path, 'utf8')
      : false;
  },

  markdown : function (p) {
    let path = _.get(paths.to.markdown, p);
    try {
      return marked(fs.readFileSync(path, 'utf8').trim());
    } catch(e) {
      console.log('Invalid path \'' + p + '\' (' + e + ')');
    }
  },

  text : function (p) {
    let path = _.get(paths.to.text, p);
    try {
      return fs.readFileSync(path, 'utf8').trim();
    } catch(e) {
      console.log('Invalid path \'' + p + '\' (' + e + ')');
    }
  },

  require : function (p) {
    var path = _.get(paths.to, p);

    if (typeof path === 'object') {
      return requireObject(p, path);
    } else if (typeof path === 'string') {
      try {
        return require(path);
      } catch (e) {
        return requireFind(p);
      }
    }
  }
};

m('src/flatman/', /\.js$/).forEach(set);

m('src/shared/', /\.js$/).forEach(set);

m('bin', /\.js$/).forEach(function (a) {
  var b = path.basename(a).split('.').slice(0, -1).join('.');
  paths.bin.script[b] = a;
});

m('bin', /\.(jpg|jpeg|png|svg)$/).forEach(function (a) {
  var b = path.basename(a).split('.').slice(0, -1).join('.');
  if (b.indexOf('webfont') === -1) {
    paths.bin.image[_.camelCase(b)] = a;
  }
});

module.exports = paths;
