const fs = require('fs');
const el = require('flatman').el;
const paths = require(require('path').resolve('src/flatman/paths'));
const Button = paths.require('component.Button');
const Component = paths.require('script.Component');

let Sprite = function () {
  this.node = {
    document : el('svg', {
      xmlns : 'http://www.w3.org/2000/svg',
      style : 'display: none'
    })
  };
};

Sprite.prototype.text = function (value) {
  let content = fs.readFileSync('bin/' + value + '.svg', 'utf8')
      .replace(/^<svg [^>]+?>/, '')
      .replace(/<\/svg>$/, '')
      .replace(/<style>[^<]+?<\/style>/g, '');


  this.node.document.attr('data-name', value);
  this.node.document.append(content);
};

module.exports = Sprite;
