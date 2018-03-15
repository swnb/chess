import io from 'socket.io-client';

//{setRoomId err}
const chooseRoom = (roomId, hooks) => {
	const socket = io('/chooseroom');
	socket.emit('choose room', roomId);
	socket.on('err room', () => {
		hooks.err();
	});
	socket.on('into room', data => {
		hooks.intoRoom(data);
	});
};

export default chooseRoom;