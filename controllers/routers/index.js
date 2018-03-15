const fs = require('fs');
const path = require('path');

const viewsPath = path.join(__dirname, '..', '/dist/index.html');
const func = async (ctx) => {
  ctx.status = 200;
  ctx.set('content-type', 'text/html');
  ctx.body = fs.createReadStream(viewsPath);
};

module.exports = {
  urlPath: '/index.server',
  get: func,
};
