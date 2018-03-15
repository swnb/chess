const signRoom = require('./signroom');

function initSide() {
  if (Math.random() > 0.5) {
    return ['X', 'O'];
  }
  return ['O', 'X'];
}

const chooseRoom = (io, updateRoomList) => {
  io.of('/chooseroom').on('connection', (socket) => {
    socket.on('choose room', (roomId) => {
      console.log(`chooseing ${roomId}`);
      // 判断是否给予权限
      if (global.id.includes(roomId)) {
        global.playingRoomList.push({
          id: roomId,
        });
        const [info] = global.emptyRoomList.remove(roomId);
        const roomUuid = signRoom(io, roomId);
        const [sideone, sidetwo] = initSide();
        // 获取两个socket,让他们连接到其他的room
        info.intoRoom({
          size: info.module.size,
          winCount: info.module.winCount,
          roomId,
          room_uuid: roomUuid,
          side: sideone,
        });
        socket.emit('into room', {
          size: info.module.size,
          winCount: info.module.winCount,
          roomId,
          room_uuid: roomUuid,
          side: sidetwo,
        });
        updateRoomList();
      } else {
        socket.emit('err room');
      }
    });
  });
};

module.exports = chooseRoom;
