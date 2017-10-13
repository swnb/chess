import io from 'socket.io-client';

//输入房间名称,{next(),err()},选边
const makeRoom = (roomId, size, winCount, hocks) => {
    const socket = io('/makeroom');
    socket.on('connect', () => {
        socket.emit('make room', roomId, size, winCount);
        socket.on('room init', () => {
            hocks.next();
        });
        socket.on('room full', () => {
            hocks.err();
        });
        socket.on('disconnect', () => {
            alert('服务器出错了');
        });
        socket.on('into room', url => {
            // hocks.redirect(url);
        });
    });
};

export default makeRoom;
