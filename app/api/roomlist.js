import io from 'socket.io-client';

//{setList}
const getRoomList = hocks => {
    const getRoomList = io('/getRoomList');
    getRoomList.on('connect', () => {
        getRoomList.on('room list', list => {
            hocks.setList(list);
        });
    });
};

export default getRoomList;
