const scripts = require('./grunt/scripts');
const css = require('./grunt/css');
const images = require('./grunt/images');
const fonts = require('./grunt/fonts');
const flatman = require('./grunt/flatman');

const isProduction = require('./grunt/isProduction');
const isSite = require('./grunt/isSite');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy : {
      fonts : isProduction
        ? {}
        : {
          expand : true,
          flatten : true,
          src : fonts.files,
          dest : 'bin/'
        },

      images : isProduction
        ? {}
        : {
          expand : true,
          flatten : true,
          src : images.files,
          dest : 'bin/'
        }
    },

    sass : {
      dist : {
        files : { 'bin/bundle.css' : css.import },
        options : isProduction
          ? {}
          : {
            trace : true,
            sourcemap : 'inline'
          }
      }
    },

    cssmin : {
      options : {},
      bundle : isProduction
        ? { files : { 'bin/bundle.min.css' : 'bin/bundle.css' } }
        : {}
    },

    concat : isProduction
      ? { empty : {} }
      : isSite
        ? {
          constants : {
            src : scripts.src.constants,
            dest : scripts.dest.constants,
          },

          vendor : {
            src : scripts.src.vendor,
            dest : scripts.dest.vendor,
          },

          containers : {
            src : scripts.src.containers,
            dest : scripts.dest.containers
          },

          components : {
            src : scripts.src.components,
            dest : scripts.dest.components
          },

          custom : {
            src : scripts.src.custom,
            dest : scripts.dest.custom
          },

          collections : {
            src : scripts.src.collections,
            dest : scripts.dest.collections
          },

          init : {
            src : scripts.src.init,
            dest : scripts.dest.init
          }
        }
        : {
          bundle : {
            options : {
              banner : ';(function (window, undefined) {\n',
              footer : '\n}(window));',
            },
            src : scripts.src.bundle,
            dest : scripts.dest.bundle
          }
        },

    uglify : {
      options : { mangle : true },
      bundle : {
        files : isProduction
          ? scripts.options.uglify
          : []
      }
    },

    autoprefixer : {
      options : {
        browsers : ['last 3 version'],
        map : true
      },

      single_file : {
        src : 'bin/bundle.css',
        dest : 'bin/bundle.css'
      },
    },

    imagemin : {
      static : {
        options : {
          optimizationLevel : 3,
          svgoPlugins : [{ removeViewBox : false }],
          use : [],
        },
        files : isProduction
          ? images.dest
          : {}
      }
    },

    watch : isProduction
      ? {}
      : {
        // Scripts
        constants : {
          files : isSite ? scripts.src.constants : [],
          tasks : ['concat:constants'],
          options : {}
        },

        vendor : {
          files : isSite ? scripts.src.vendor : [],
          tasks : ['concat:vendor'],
          options : {}
        },

        components : {
          files : isSite ? scripts.src.components : [],
          tasks : ['concat:components'],
          options : {}
        },

        containers : {
          files : isSite ? scripts.src.containers : [],
          tasks : ['concat:containers'],
          options : {}
        },

        custom : {
          files : isSite ? scripts.src.custom : [],
          tasks : ['concat:custom'],
          options : {}
        },

        collections : {
          files : isSite ? scripts.src.collections : [],
          tasks : ['concat:collections'],
          options : {}
        },

        init : {
          files : isSite ? scripts.src.init : [],
          tasks : ['concat:init'],
          options : {}
        },

        bundle : {
          files : !isSite ? scripts.src.bundle : [],
          tasks : ['concat:bundle'],
          options : {}
        },

        // Sass
        css : {
          files : css.glob,
          tasks : ['sass', 'autoprefixer']
        },

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
        },

        dotenv : {
          files : ['.env'],
          options : { reload : true },
          tasks : ['default']
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('flatman', flatman.task);

  grunt.registerTask('default', [
    'concat',
    'uglify',
    'sass',
    'cssmin',
    'autoprefixer',
    'copy',
    'imagemin',
    'flatman',
    'watch'
  ]);
};
