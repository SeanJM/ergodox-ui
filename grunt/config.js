const fs = require('fs');
const flatman = require('./flatman');
const scripts = require('./scripts');
const css = require('./css');
const images = require('./images');
const fonts = require('./fonts');

const config = JSON.parse(fs.readFileSync('package.json')).gruntBuild;

module.exports = {
  copy : {
    fonts : config.isProduction
      ? {}
      : {
        expand : true,
        flatten : true,
        src : fonts.files,
        dest : 'bin/'
      },

    images : config.isProduction
      ? {}
      : {
        expand : true,
        flatten : true,
        src : images.files,
        dest : 'bin/'
      }
  },

  sass : css.task.sass,

  cssmin : css.task.cssmin,

  concat : scripts.task.concat,

  uglify : scripts.task.uglify,

  autoprefixer : css.task.autoprefixer,

  imagemin : {
    static : {
      options : {
        optimizationLevel : 3,
        svgoPlugins : [{ removeViewBox : false }],
        use : [],
      },
      files : config.isProduction
        ? images.dest
        : {}
    }
  },

  watch : config.isProduction
    ? {}
    : Object.assign({
    // Flatman
    flatman : {
      files : flatman.glob,
      tasks : ['flatman']
    },

    // Config and Environment
    configFiles : {
      files : ['Gruntfile.js'],
      options : {
        reload : true
      },
      tasks: ['default']
    }
  }, scripts.task.watch, css.task.watch)
};
