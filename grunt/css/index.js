const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('package.json'));

const importFile = config.gruntBuild.isSite
  ? 'src/application/import.scss'
  : 'src/import.scss';

const files = require('./files');

const dest = files.dest[
  config.gruntBuild.isProduction
    ? 'production'
    : 'development'
];

let task = {
  concat : {},
  watch : {},
  sass : {}
};

if (files.list.length) {
  fs.writeFile(importFile, files.list.map(function (f) {
    let s = f.split(path.sep).slice(2);
    return `@import "${s.join(path.sep)}";\n`;
  }).join(''));
} else if (m('src/application/styles', /\.scss$/).length) {
  console.log('Incorrect folder structure. Styles must go into folders like\n - \'styles/vendor\'\n- \'styles/custom\'\n- \'styles/constants\'');
}

if (config.gruntBuild.isProduction) {
  task.sass = {
    dist : {
      files : {
        'bin/bundle.css' : importFile
      }
    },
    options : {
      sourcemap : false,
    }
  };

  task.autoprefixer = {
    options : {
      browsers : ['last 3 version'],
      map : false
    },

    single_file : {
      src : 'bin/bundle.css',
      dest : 'bin/bundle.css'
    }
  };

  task.watch.css = {
    files : [
      'src/application/styles/**/*.scss',
      'src/application/components/**/*.scss',
      'src/application/containers/**/*.scss',
      'src/application/collections/**/*.scss'
    ],
    tasks : ['sass', 'autoprefixer']
  };
} else {
  task.sass = {
    dist : {
      files : {
        'bin/bundle.css' : importFile
      }
    },
    options : {
      trace : true,
      sourcemap : config.gruntBuild.sourceMap
        ? 'inline'
        : false,
      style : 'expanded'
    }
  };

  task.autoprefixer = {
    options : {
      browsers : ['last 3 version'],
      map : config.gruntBuild.sourceMap ? true : false
    },

    single_file : {
      src : 'bin/bundle.css',
      dest : 'bin/bundle.css'
    }
  };
}

module.exports = {
  list : files.list,
  dest : dest,
  task : task
};
