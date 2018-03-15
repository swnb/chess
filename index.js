const run = require('./server');

run();

process.on('uncaughtException', (err) => {
  console.warn(err);
});
