const fs = require('fs');
const path = require('path');
const views_path = path.join(__dirname, '..', '/dist/index.html');
const func = async ctx => {
    ctx.status = 200;
    ctx.set('content-type', 'text/html');
    ctx.body = fs.createReadStream(views_path);
};

module.exports = {
    urlPath: '/',
    get: func
};
