import io from 'socket.io-client';

const playing = hocks => {
    const player = io('/playing');
    player.on('connect', () => {
        hocks.connect();
    });
};
