const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('package.json')).gruntBuild;
const writeImport = require('./writeImport');

const files = require('./files');

let task = {
  autoprefixer : {
    options : {
      browsers : ['last 3 version'],
      map : false,
      src : files.dest.bundle,
      dest : files.dest.bundle
    }
  },
  concat : {},
  watch : {},
  sass : {
    options : { sourcemap : false }
  }
};

if (files.list.length) {
  writeImport(importFile, files.list);
} else if (m('src/application/', /\.scss$/).length) {
  console.log(
`Incorrect folder structure. Styles go into folders like
  - \'src/application/styles/vendor\'
  - \'src/application/styles/custom\'
  - \'src/application/styles/constants\'
`);
}

task.sass = {
  dist : { files : {} },
  options : {}
};

if (!config.isProduction) {
  task.sass.options.trace = true;
  task.sass.options.style = 'expanded';

  if (config.sourceMap) {
    task.sass.options.sourcemap = 'inline';
    task.autoprefixer.options.map = true;
  }

  if (config.isBundle) {
    task.sass.dist.files[dest.bundle] = importFile;
  } else {
    for (var k in files.dest) {
      task.sass.dist.files[files.dest[k]] = files.src[k];
    }
  }

  task.watch.css = {
    files : [
      'src/application/styles/**/*.scss',
      'src/application/components/**/*.scss',
      'src/application/containers/**/*.scss',
      'src/application/collections/**/*.scss'
    ],
    tasks : ['sass', 'autoprefixer']
  };
}

console.log(task.sass.dist.files);

module.exports = {
  list : files.list,
  dest : files.dest,
  task : task
};
