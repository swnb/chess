const websocket = require('ws');

const main = async server => {
    const wss = websocket.Server({ server });
    wss.on('connection', (ws, req) => {
        ws.on('');
    });
};
