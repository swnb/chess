// this api use golang to run the subscribe of winner arr

// const checkSize = 3
// const winCount = 3
// const index = 4

// let json = {
//     arr: str,
//     checkSize,
//     winCount,
//     index,
// }

const { spawn } = require('child_process');

const binpath = require('../config').path.bin;

const path = require('path');

const getwinner = (arr, index, checkSize, winCount, cb) => {
  const jsondata = {
    arr,
    check_size: checkSize,
    index,
    win_count: winCount,
  };
  const golang = spawn(path.join(binpath, 'getwinner'), [
    JSON.stringify(jsondata),
  ]);

  golang.on('close', () => {});
  golang.stdout.on('data', (data) => {
    cb(data.toString());
  });
  golang.stderr.on('data', (data) => {
    cb(data.toString());
  });
};

module.exports = getwinner;
