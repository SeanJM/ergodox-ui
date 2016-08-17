const page = require('flatman').page;
const el = require('flatman').el;

module.exports = page('index.html')
  .body(
    el('div.app#app')
  );
