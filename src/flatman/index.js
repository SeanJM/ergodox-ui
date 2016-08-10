const page = require('flatman').page;
const el = require('flatman').el;
const m = require('match-file-utility');
const _ = require('lodash');

const p = page();

p.body(
  el('div.app#app')
);

p.script('settings');
p.script('bin/vendor');
p.script('bin/components');
p.script('bin/custom');
p.script('bin/ui');

p.css('bin/all');

p.write('index.html');
