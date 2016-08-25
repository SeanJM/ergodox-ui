const _ = require('lodash');
const m = require('match-file-utility');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('package.json')).gruntBuild;

const imageFiles = Object.keys(require('./images').dest);

const cssFiles = _.map(require('./css').files.dest, a => a);

const scriptFiles = _.map((
  config.isSite
    ? require('./scripts/site_files')
    : require('./scripts/plugin_files')
  ).dest[
    config.isProduction
      ? 'production'
      : 'development'
  ], a => a);

m('bin', /\.css$/).forEach(function (f) {
  if (cssFiles.indexOf(f) === -1) {
    fs.unlink(f);
  }
});

m('bin', /\.css\.map$/).forEach(function (f) {
  if (cssFiles.indexOf(f + '.map') === -1) {
    fs.unlink(f);
  }
});

m('bin', /\.(png|svg|jpg)$/).forEach(function (f) {
  if (imageFiles.indexOf(f) === -1) {
    fs.unlink(f);
  }
});

m('bin', /\.(js)$/).forEach(function (f) {
  if (scriptFiles.indexOf(f) === -1) {
    fs.unlink(f);
  }
});

m('bin', /\.(js\.map)$/).forEach(function (f) {
  if (scriptFiles.indexOf(f + '.map') === -1) {
    fs.unlink(f);
  }
});
