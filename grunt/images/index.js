const _ = require('lodash');
const m = require('match-file-utility');
const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync('package.json')).gruntBuild;

let dest = {
  root : {},
  group : {}
};

let root = config.isSite
  ? 'src/application/images'
  : 'src/images';

let match = /\.(png|jpg|svg)$/;
let files = m(root, match);
let list_tasks = [];

let group = _.groupBy(files, function (a) {
  var dir = path.dirname(a);
  var type = a.slice(-3);

  if (type === 'svg' && dir !== root) {
    return dir.split(path.sep).slice(-1)[0];
  } else {
    return 'root';
  }
});

let task = {
  imagemin : {},
  copy : {},
  svgstore : {},
  watch : {}
};

_.forEach(group.root, function (file) {
  dest.root['bin/' + path.basename(file)] = file;
});

task.imagemin.images = {
  static : {
    options : {
      optimizationLevel : 3,
      svgoPlugins : [{ removeViewBox : false }],
      use : [],
    },
    files : dest.root
  }
};

_.forEach(_.omit(group, 'root'), function (files, key) {
  var svg_files = {};
  var name = 'bin/' + key + '.svg';

  svg_files[name] = files;
  dest.group[name] = files;

  task.svgstore[key] = {
    options : {
      cleanup : [ 'fill', 'stroke' ],
      cleanupdefs : true
    },
    files : svg_files
  };

  list_tasks.push('svgstore:' + key);
});

list_tasks.push('copy:images');

task.copy = {
  expand : true,
  flatten : true,
  src : group.root,
  dest : 'bin/'
};

task.watch.images = {
  files : files,
  tasks : list_tasks,
};

module.exports = {
  task : task,
  dest : _.merge({}, dest.root, dest.group),
  files : files
};
