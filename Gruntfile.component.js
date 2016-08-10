var path = require('path');
var M = require('match-file-utility');
var images = {};

M('src/', /\.(png|jpeg|jpg|svg)$/).forEach(function (src) {
  var dest = 'bin/' + path.basename(src);
  images[dest] = src;
});

module.exports = {
  task : {
    static : {
      options : {
        optimizationLevel : 3,
        svgoPlugins : [{ removeViewBox: false }],
        use : [ ]
      },

      files : images
    },
  }
};
