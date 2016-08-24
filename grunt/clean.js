const _ = require('lodash');
const m = require('match-file-utility');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('package.json'));

const imageFiles = Object.keys(require('./images').dest);

const scriptFiles = _.map((
  config.gruntBuild.isSite
    ? require('./scripts/site_files')
    : require('./scripts/plugin_files')
  ).dest[
    config.gruntBuild.isProduction
      ? 'production'
      : 'development'
  ], a => a);

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
