import io from 'socket.io-client';

const roomParse = roomId => {
    return `/${roomId}`;
    // return `http://location.host/checkerPlayer/${room}`;
};

//房间id ;选边 ;{init(),next(p),exit(e)} ;errFunc
const connect = (roomId, hocks, chooseSide = null) => {
    //将roomId整合成url连接
    const url = roomParse(roomId);
    const room = io(url);

    room.on('connect', function() {
        //连接发送roomId
        room.emit(`${roomId}`, chooseSide);

        room.on('init', who => {
            hocks.init(who);
        });

        room.on('next', hocks.next);
        room.on('disconnect', hocks.exit);
    });
    const connection = {
        // 传递位子和下落棋子的位子
        dispatch: function(chooseSide, p) {
            room.emit('next', chooseSide, p);
        },
        exit: () => {
            room.close();
        }
    };
    return connection;
};

export default connect;
