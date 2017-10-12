const socketIo = require('socket.io');
const path = require('path');

const chooseRoom = require(path.join(__dirname, './namespace/chooseroom'));
const room = require(path.join(__dirname, './namespace/room'));
const getRoomList = require(path.join(__dirname, './namespace/getroomlist'));

const main = server => {
    const io = socketIo(server);
    chooseRoom(io);
    room(io);
    getRoomList(io);
};
module.exports = main;
