const path = require('path')
module.exports = {
    port: 8080,
    socketioConfig: {
        // path: 'dist',
        serveClient: false,
        //如果成为polling的话,超时连接.1
        pingTimeout: 120000,
        pingInterval: 10000,
        transports: ['polling', 'websocket'],
        cookie: true
    },
    maxRoom: 10,
    path: {
        bin: path.resolve(__dirname, 'bin'),
        api: path.resolve(__dirname, 'api')
    }
};