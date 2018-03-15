import io from 'socket.io-client';

// 输入房间名称,{next(),err()},选边
const makeRoom = (data, hooks) => {
  const socket = io('/makeroom');
  socket.on('connect', () => {
    socket.emit('make room', data);
    socket.on('room init', () => {
      hooks.next();
    });
    socket.on('room full', () => {
      hooks.err();
    });
    socket.on('disconnect', () => {
      /* eslint-disable */
            alert('服务器出错了'); /* eslint-disable */
        });
        socket.on('into room', (message) => {
            hooks.intoRoom(message);
        });
    });
};

export default makeRoom;