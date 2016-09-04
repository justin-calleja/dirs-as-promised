var t = require('tap');
var path = require('path');
var dirs = require('..');

const fixturesPath = path.join(__dirname, 'fixtures');

t.test('Can be used to get dir names in a given directory', t => {
  return dirs(fixturesPath).then(dirNames => {
    t.ok(dirNames.filter(el => el === 'dir1')[0], 'expecting to find \'dir1\' in result');
    t.ok(dirNames.filter(el => el === 'dir2')[0], 'expecting to find \'dir2\' in result');
    t.equal(dirNames.length, 2, 'expecting 2 directory names in result');
  });
});

t.test('If given directory does not exists, gives back []', t => {
  return dirs('/meh/meh').then(dirNames => {
    t.equal(dirNames.length, 0, 'expecting 0 directory names in result');
  });
});

t.test('Can use Promise.all to search for directory names in multiple given absolute paths', t => {
  return Promise.all(
    [fixturesPath, path.join(fixturesPath, 'dir2')].map(dirs)
  ).then(result => {
    t.equal(result.length, 2, 'expecting 2 lists of results in the result, one for each given abs path');

    t.ok(result[0].filter(el => el === 'dir1')[0], 'expecting to find \'dir1\' in result[0]');
    t.ok(result[0].filter(el => el === 'dir2')[0], 'expecting to find \'dir2\' in result[0]');
    t.equal(result[0].length, 2, 'expecting 2 directory names in result[0]');

    t.ok(result[1].filter(el => el === 'dir2.1')[0], 'expecting to find \'dir2.1\' in result[1]');
    t.equal(result[1].length, 1, 'expecting 1 directory name in result[1]');
  });
});
