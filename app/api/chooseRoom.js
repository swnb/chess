import io from 'socket.io-client';

//{setRoomId err}
const chooseRoom = o => {
    const socket = io('/chooseRoom');
    socket.on('disconnect', o.err);
    socket.emit('choose room', roomId);
    socket.on('room', mes => {
        const json = JSON.parse(mes);
        switch (parseInt(json.code)) {
            case 0:
                o.setRoomId(json.roomId);
                break;
            case 1:
                o.err(json.err);
                break;
        }
    });
};
