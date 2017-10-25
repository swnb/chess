import io from 'socket.io-client';

//{setList}
const getRoomList = hooks => {
    const getRoomList = io('/getRoomList');
    getRoomList.on('connect', () => {
        getRoomList.on('room list', list => {
            hooks.setList(list);
        });
    });
};

export default getRoomList;
