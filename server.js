const fs = require('fs');
const util = require('util');
const path = require('path');

const config = require(`${__dirname}/config`);
const websocket = require(`${__dirname}/controllers/websocket/websocket`);

const Koa = require('koa');
const staticFile = require('koa-static');
const router = require('koa-router')();

const app = new Koa();

const fsReaddir = util.promisify(fs.readdir);

const main = async () => {
  const contrPath = path.resolve(`${__dirname}/controllers/routers/`);
  const files = await fsReaddir(contrPath);
  // 注册路由
  files.forEach((file) => {
    const filePath = path.join(contrPath, file);
    const {
      urlPath,
      get,
      post,
    } = require(filePath);
    if (get) {
      router.get(urlPath, get);
    }
    if (post) {
      router.post(urlPath, post);
    }
  });

  // 静态server
  const staticServer = staticFile(path.join(__dirname, 'dist'), {
    maxage: 60 * 60 * 60 * 1000,
  });

  app.use(router.routes());
  app.use(staticServer);

  const httpServer = app.listen(config.port);

  websocket(httpServer);
  console.log(`server is running at port ${config.port}`);
};

module.exports = main;
