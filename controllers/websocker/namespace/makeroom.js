const path = require('path');

const configPath = path.join(__dirname, '..', '..', '..', 'config');

const maxRoom = require(configPath).maxRoom;

const makeRoom = (io, updateRoomList) => {
    const makeroom = io.of('/makeroom').on('connection', socket => {
        socket.on('make room', (roomId, size, winCount) => {
            //去空格
            roomId = roomId.trim();
            if (global.emptyRoomList.length >= maxRoom) {
                //如果溢出那么就算了..
                socket.emit('room full');
                console.log('make room false');
            } else if (global.id.includes(roomId)) {
                //如果已经有了这个id就算了...
                socket.emit('room full');
                console.log('make room false 已经存在');
            } else {
                //如果都满足,那么就添加
                global.emptyRoomList.push({
                    module: { size, winCount },
                    id: roomId
                });
                console.log(`room ${roomId} 生成`);
                console.log(`所有房间 ${global.id}`);
                //更新所有房间
                updateRoomList();
                socket.emit('room init');
            }
        });
    });
    makeroom.on('connect', () => {
        console.log('making room...');
    });
};

module.exports = makeRoom;
