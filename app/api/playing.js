import io from 'socket.io-client';

const playing = (roomId, hocks) => {
    const player = io(`/${roomId}`);
    player.on('connect', () => {
        hocks.connect();
    });
    player.on('next', i => {
        hocks.next(i);
    });
    player.on('room distory', () => {
        hocks.destory();
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
