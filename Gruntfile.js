var M = require('match-file-utility');
var path = require('path');
var fs = require('fs');
var flatman = require('./node_modules/flatman/flatman.js');

var lib = {
  fonts : M('src/source-sans-pro/', /(eot|svg|ttf|woff|woff2)$/),
  // JavaScript
  js : {}
};

require('dotenv').config();

lib.sass = [];
lib.sass = lib.sass.concat('src/styles/variables.scss');
lib.sass = lib.sass.concat(M('src/styles/', /scss$/));
lib.sass = lib.sass.concat(M('src/components/', /scss$/));

lib.js.vendor = [ 'src/scripts/vendor/*.js' ];

lib.js.custom = [
  'src/scripts/custom/KEYCODE.js',
  'src/scripts/custom/KEYBOARD.js',
  'src/scripts/custom/COLOR.js',
  'src/scripts/custom/EMPTY.js',
  'src/scripts/custom/Modal.*.js',
  'src/scripts/custom/language/english.js',
  'src/scripts/custom/index.js',
];

lib.js.ui = [
  'src/dialogs/*.js'
];

lib.js.components = [];

// Component
lib.js.components = lib.js.components.concat(M('src/components/', /\.js$/));

// Custom
module.exports = function(grunt) {
  grunt.registerTask('flatman', function () {
    require('./src/flatman/index');
  });

  grunt.registerTask('sass-concat', function () {
    var w = lib.sass.map(f => '@import \"' + f.slice(4) + '\";\n').join('\n');

    fs.writeFile('src/import.scss', w);
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        sourceMap: true,
        compress : false,
        mangle: false
      },

      vendor : {
        files : {
          'bin/vendor.js' : lib.js.vendor
        }
      },

      custom : {
        files : {
          'bin/custom.js' : lib.js.custom
        }
      },

      components : {
        files : {
          'bin/components.js' : lib.js.components
        }
      },

      ui : {
        files : {
          'bin/ui.js' : lib.js.ui
        }
      }
    },

    concat: {
      options: {
        sourceMap: true,
      },

      vendor : {
        files : {
          'bin/vendor.js' : lib.js.vendor
        }
      },

      custom : {
        files : {
          'bin/custom.js' : lib.js.custom
        }
      },

      components : {
        files : {
          'bin/components.js' : lib.js.components
        }
      },

      ui : {
        files : {
          'bin/ui.js' : lib.js.ui
        }
      }
    },

    copy: {
      main: {
        files: [{
          expand : true,
          flatten : true,
          src : lib.fonts,
          dest : 'bin/'
        },
        process.env.NODE_ENV === 'development'
          ? {
            expand : true,
            flatten : true,
            src : M('src/', /\png$|\jpg$|\jpeg$/),
            dest : 'bin/'
          }
          : {}
        ],
      }
    },

    sass: {
      dist: {
        options: {
          trace: true,
          sourcemap: 'inline'
        },
        files: {
          'bin/all.css' : 'src/import.scss'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 3 version'],
        map: true
      },

      single_file: {
        src: 'bin/all.css',
        dest: 'bin/all.css'
      }
    },

    imagemin : process.env.NODE_ENV === 'development'
      ? { options : {}, files : {} }
      : require('./Gruntfile.imagemin').task,

    watch: {
      custom : {
        options: {},

        files: lib.js.custom,
        tasks: ['concat:custom']
      },

      components : {
        options: {},

        files: lib.js.components,
        tasks: ['concat:components']
      },

      ui : {
        options: {},

        files: lib.js.ui,
        tasks: ['concat:ui']
      },

      vendor : {
        options: {},

        files: lib.js.vendor,
        tasks: ['concat:vendor']
      },

      css: {
        files: lib.sass,
        tasks: ['sass', 'autoprefixer']
      },

      pages : {
        files : M('src/flatman/', /\.js$/),
        tasks : ['flatman']
      },

      configFiles: {
        options: {
          reload: true
        },

        files: ['Gruntfile.js'],

        tasks: ['default']
      }
    }
  }); // Grunt config

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', [
    'sass-concat',
    'sass',
    'autoprefixer',
    'concat',
    'imagemin',
    'copy',
    'flatman',
    'watch'
  ]);

};
