const m = require('match-file-utility');
const fs = require('fs');
const scripts = require('./scripts');
const css = require('./css');

let files = m('src/flatman/', /\.js$/);

module.exports = {
  glob : [
    'src/flatman/**/*.js',
    'src/flatman/**/*.txt',
    'src/flatman/**/*.md'
  ],

  files : files,
  task : function () {
    const pages = m('src/flatman/pages', /\.js$/).map(a => '../' + a);

    pages.forEach(function (file) {
      var page = require(file);

      if (typeof page === 'undefined') {
        console.log('Cannot generate: \'' + file + '\', is it using \'module.exports\'?');
      }

      for (var k in scripts.dest) {
        try {
          fs.statSync(scripts.dest[k]);
          page.script(scripts.dest[k]);
        } catch (e) {}
      }

      for (k in css.files.dest) {
        try {
          fs.statSync(css.files.dest[k]);
          page.css(css.files.dest[k]);
        } catch (e) {}
      }

      page.write();
    });
  }
};
