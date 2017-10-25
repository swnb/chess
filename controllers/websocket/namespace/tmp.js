const signRoom = require('./signroom');

function initSide() {
    if (Math.random() > 0.5) {
        return ['X', 'O'];
    } else {
        return ['O', 'X'];
    }
}

const chooseRoom = async(io, updateRoomList) => {
    const {
        choose,
        socket
    } = await Promise((res, rej) => {
        const choose = io.of('/chooseroom').on('connection', socket => {
            res({
                choose,
                socket
            });
        })
    })

    const roomId = await Promise((res,rej) => socket.on('choose room', roomId => res(roomId)))

    console.log('chooseing ' + roomId);
    //判断是否给予权限
    if (global.id.includes(roomId)) {
        global.playingRoomList.push({
            id: roomId
        });
        const [info] = global.emptyRoomList.remove(roomId);
        const room_uuid = signRoom(io, roomId);
        [sideone, sidetwo] = initSide();
        //获取两个socket,让他们连接到其他的room
        info.intoRoom({
            size: info.module.size,
            winCount: info.module.winCount,
            roomId: roomId,
            room_uuid: room_uuid,
            side: sideone
        });
        socket.emit('into room', {
            size: info.module.size,
            winCount: info.module.winCount,
            roomId: roomId,
            room_uuid: room_uuid,
            side: sidetwo
        });
        updateRoomList();
    } else {
        socket.emit('err room');
    }
};

module.exports = chooseRoom;