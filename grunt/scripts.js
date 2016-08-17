const fs = require('fs');
const m = require('match-file-utility');
const isSite = require('./isSite');
const isProduction = require('./isProduction');

let src = {
  constants : m('src/application/scripts/constants/', /\.js$/),
  vendor : m('src/application/scripts/vendor/', /\.js$/),
  components : m('src/application/components/', /\.js$/),
  containers : m('src/application/containers/', /\.js$/),
  custom : m('src/application/scripts/custom/', /\.js$/),
  collections : m('src/application/collections/', /\.js$/),
  init : 'src/application/scripts/init.js'
};

let dest = {
  site : {
    development : {
      constants : 'bin/constants.js',
      vendor : 'bin/vendor.js',
      custom : 'bin/custom.js',
      components : 'bin/components.js',
      collections : 'bin/collections.js',
      containers : 'bin/containers.js',
      init : 'bin/init.js'
    },
    production : {
      bundle : 'bin/bundle.min.js'
    }
  },
  plugin : {
    development : {
      bundle : 'bin/bundle.js'
    },
    production : {
      bundle : 'bin/bundle.min.js'
    }
  }
};

src.bundle = [].concat(
  src.constants,
  src.vendor,
  src.custom,
  src.components,
  src.containers,
  src.collections
);

module.exports = {
  src : src,

  dest : isSite
    ? isProduction
      ? dest.site.production
      : dest.site.development
    : isProduction
      ? dest.plugin.production
      : dest.plugin.development,

  options : {
    uglify : {
      'bin/bundle.min.js' : src.bundle
    }
  }
};
