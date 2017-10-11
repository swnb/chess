import io from 'socket.io-client';

//房间id 选边 {init(),next(p)} errFunc
const connect = (roomId, chooseSide, hocks, errFunc) => {
    // 传递位子和下落棋子的位子
    const dispatch = function(chooseSide, p) {
        if (!room.id) {
            alert('还没有连接');
        }
        room.emit('next', chooseSide, p);
    };

    const exit = () => {
        room.close();
    };

    //将roomId整合成url连接
    const url = roomParse(roomId);
    const room = io.connect(url);
    room.on('connect', function() {
        //连接发送roomId
        room.emit(`${roomId}`, chooseSide);

        room.on('init', who => {
            //调用hock的函数
            hocks.init();
            room.on('next', hocks.next);
        });

        room.on(
            'disconnect',
            errFunc ||
                function(e) {
                    console.log(err);
                }
        );
    });
    return { dispatch, exit };
};

const roomParse = room => {
    return `http://location.host/checkerPlayer/${room}`;
};
