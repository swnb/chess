import io from 'socket.io-client';

// {setList}
const getRoomList = (hooks) => {
  const getRoomLists = io('/getRoomList');
  getRoomLists.on('connect', () => {
    getRoomLists.on('room list', (list) => {
      hooks.setList(list);
    });
  });
};

export default getRoomList;
