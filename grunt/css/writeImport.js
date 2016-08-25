const path = require('path');
const fs = require('fs');

function writeImport(dest, list) {
  let output = files.list.map(
    function (fullpath) {
      let relative = fullpath.split(path.sep).slice(2);
      return `@import "${relative.join(path.sep)}";`;
    }
  );
  fs.writeFile(dest, ouput.join('\n'));
}

module.exports = writeImport;
