const getRoomList = io => {
    const getList = io.of('/getRoomList').on('connection', socket => {
        socket.emit('room list', global.roomList);
    });
    updateRoomList = () => {
        getList.emit('room list', global.roomList);
    };
    return updateRoomList;
};

module.exports = getRoomList;
