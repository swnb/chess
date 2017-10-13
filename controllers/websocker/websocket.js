const socketIo = require('socket.io');
const path = require('path');

const chooseRoom = require(path.join(__dirname, './namespace/chooseroom'));
// const room = require(path.join(__dirname, './namespace/room'));
const roomList = require(path.join(__dirname, './namespace/roomlist'));
const makeRoom = require(path.join(__dirname, './namespace/makeroom'));

global.roomList = [
    { module: { size: 12, winCount: 6 }, id: 'who' },
    { module: { size: 13, winCount: 5 }, id: 'who' }
];

//重写他的push方法,最为id的双向绑定
global.roomList.push = function(arg) {
    global.id.push(arg.id);
    Array.prototype.push.call(global, arg);
};

console.log(`room list 生成`);

global.id = global.roomList.map(e => e.id);

const main = httpServer => {
    const io = socketIo(httpServer);
    chooseRoom(io);
    // room(io);
    const updateRoomList = roomList(io);

    makeRoom(io, updateRoomList);
};
module.exports = main;
