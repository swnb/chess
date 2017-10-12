import io from 'socket.io-client';

//{setList}
const getRoomList = hocks => {
    const getRoomList = io('/getRoomList');
    console.log(1);
    getRoomList.on('connect', () => {
        console.log('connect');
        getRoomList.on('room list', hocks.setList);
    });
};

export default getRoomList;
