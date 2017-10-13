const playing = io => {
    const player = io.of('/playing').on('connection', socket => {
        socket.emit('next', 10);
        socket.on('nextMove', i => {
            console.log(i);
        });
    });
};
module.exports = playing;
