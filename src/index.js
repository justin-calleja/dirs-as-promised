var fs = require('fs');
var path = require('path');

module.exports = (absPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(absPath, (err, files) => {

      if (err) {
        if (err.code === 'ENOENT') {
          // if path doesn't exist, it's not an error, resolve with []
          return resolve([]);
        }
        return reject(err);
      }

      resolve(
        Promise.all(
          files.map(fileName => {
            return new Promise((resolve, reject) => {
              fs.stat(path.join(absPath, fileName), (err, stats) => {
                if (err) return reject(err);
                return stats.isDirectory() ? resolve(fileName) : resolve(null);
              });
            });
          })
        ).then(results => results.filter(res => res !== null))
      );

    });
  });
};
