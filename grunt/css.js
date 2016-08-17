const fs = require('fs');
const path = require('path');
const m = require('match-file-utility');
const importFile = 'src/application/import.scss';

let files = [];

files = files.concat(m('src/application/fonts/', /\.scss$/));
files = files.concat(m('src/application/styles/', /\.scss$/));
files = files.concat(m('src/application/components/', /\.scss$/));
files = files.concat(m('src/application/containers/', /\.scss$/));
files = files.concat(m('src/application/collections/', /\.scss$/));

files.sort(function (a, b) {
  let abase = path.basename(a);
  let bbase = path.basename(b);

  if (abase === 'constants.scss') {
    return -1;
  }

  if (bbase === 'constants.scss') {
    return 1;
  }

  if (abase === 'base.scss' && bbase === 'constants.scss') {
    return 1;
  }

  if (a > b) {
    return -1;
  } else if (b > a) {
    return 1;
  }

  return 0;
});

fs.writeFile(importFile, files.map(function (f) {
  let s = f.split(path.sep).slice(2);
  return `@import "${s.join(path.sep)}";\n`;
}).join(''));

module.exports = {
  files : files,
  import : importFile,
  glob : [
    'src/application/styles/**/*.scss',
    'src/application/components/**/*.scss',
    'src/application/containers/**/*.scss',
    'src/application/collections/**/*.scss'
  ]
};
