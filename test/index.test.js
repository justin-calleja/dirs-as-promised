var t = require('tap');
var path = require('path');
var dirs = require('..');

const fixturesPath = path.join(__dirname, 'fixtures');

t.test('can be used to get dir names in a given directory', t => {
  return dirs(fixturesPath).then(dirNames => {
    t.ok(dirNames.filter(el => el === 'dir1')[0], 'expecting to find \'dir1\' in result');
    t.ok(dirNames.filter(el => el === 'dir2')[0], 'expecting to find \'dir2\' in result');
    t.equal(dirNames.length, 2, 'expecting 2 directory names in result');
  });
});

t.test('if given directory does not exists, gives back []', t => {
  return dirs('/meh/meh').then(dirNames => {
    t.equal(dirNames.length, 0, 'expecting 0 directory names in result');
  });
});
