import io from 'socket.io-client';

//{setRoomId err}
const chooseRoom = (roomId, hocks) => {
    const socket = io('/chooseroom');
    socket.emit('choose room', roomId);
    socket.on('err room', () => {
        hocks.err();
    });
    socket.on('into room', data => {
        hocks.intoRoom(data);
    });
};

export default chooseRoom;
