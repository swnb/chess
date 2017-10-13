const chooseRoom = (io, updateRoomList) => {
    const choose = io.of('/chooseroom').on('connection', socket => {
        socket.on('choose room', roomId => {
            console.log('recive ' + roomId);
            //判断是否给予权限
            if (global.id.includes(roomId)) {
                global.emptyRoomList.remove(roomId);
                global.playingRoomList.push({ id: roomId });
                updateRoomList();
            } else {
                socket.emit('err room');
            }
        });
    });
};

module.exports = chooseRoom;
