import io from 'socket.io-client';

const playing = hocks => {
    const player = io('/playing');
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
