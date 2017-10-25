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
    const emitNextMove = i => {
        player.emit('nextMove', i);
    };
    const exitRoom = () => {
        player.emit('exit');
    };
    return { emitNextMove, exitRoom };
};

export default playing;
