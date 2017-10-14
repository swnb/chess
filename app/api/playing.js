import io from 'socket.io-client';

const playing = (roomId, hocks) => {
    const player = io(`/${roomId}`);
    player.on('connect', () => {
        hocks.connect();
    });
    player.on('next', i => {
        hocks.next(i);
    });
    const emitNextMove = i => {
        player.emit('nextMove', i);
    };
    return emitNextMove;
};

export default playing;
