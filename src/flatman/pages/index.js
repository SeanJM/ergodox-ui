const path = require('path');
const fs = require('fs');
const page = require('flatman').page;
const el = require('flatman').el;
const paths = require(path.resolve('src/flatman/paths'));
const Component = paths.require('script.Component');
const Sprite = paths.require('component.Sprite');

module.exports = page('index.html')
  .body(
    el('div.app#app'),
    el(Sprite, 'icon')
  );
