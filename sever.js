const fs = require('fs');
const util = require('util');
const path = require('path');

const config = require(__dirname + '/config');
const websocket = require(__dirname + '/controllers/websocker/websocket');

const Koa = require('koa');
const static = require('koa-static');
const router = require('koa-router')();
const app = new Koa();

const fsReaddir = util.promisify(fs.readdir);

const main = async ctx => {
    const contrPath = path.resolve(__dirname + '/controllers/routers/');
    const files = await fsReaddir(contrPath);
    // 注册路由
    files.forEach(file => {
        const filePath = path.join(contrPath, file);
        const { urlPath, get, post } = require(filePath);
        get ? router.get(urlPath, get) : null;
        post ? router.post(urlPath, post) : null;
    });

    //静态server
    const staticServer = static(path.join(__dirname, 'dist'));

    app.use(router.routes());
    app.use(staticServer);

    const server = app.listen(config.port);

    websocket(server);
    console.log(`server is running at port ${config.port}`);
};

module.exports = main;
