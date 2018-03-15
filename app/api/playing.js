import io from 'socket.io-client';

const playing = (roomId, hooks) => {
	const player = io(`/${roomId}`);
	player.on('connect', () => {
		hooks.connect();
	});
	player.on('next', i => {
		hooks.next(i);
	});
	player.on('room distory', () => {
		hooks.destory();
	});
	player.on('winner', (i, arr) => {
		console.log('winner winner chicken dinner');
		hooks.winner(i, arr);
	});
	const emitNextMove = i => {
		player.emit('nextMove', i);
	};
	const exitRoom = () => {
		player.emit('exit');
	};
	const dispatch = (arr, index, checkSize, winCount) => {
		player.emit('checknext', arr, index, checkSize, winCount);
	};
	return {
		emitNextMove,
		exitRoom,
		dispatch,
	};
};

export default playing;