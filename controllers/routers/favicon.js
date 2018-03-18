const fs = require('fs');
const path = require('path');

const viewsPath = path.join(__dirname, '..', '..', 'favicon.ico');
const func = async (ctx) => {
  ctx.status = 200;
  ctx.set('content-type', 'image/x-icon');
  ctx.body = fs.createReadStream(viewsPath);
};

module.exports = {
  urlPath: '/favicon.ico',
  get: func,
};
