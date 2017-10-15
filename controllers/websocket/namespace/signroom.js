const uuidv5 = require('uuid/v5');
const signRoom = (io, roomId) => {
    const id = uuidv5(roomId, global.NAMESPACE);
    const server = io.of(`/${id}`).on('connection', socket => {
        socket.on('nextMove', i => {
            console.log(typeof i, i);
            socket.broadcast.emit('next', i);
        });
    });
    return id;
};

module.exports = signRoom;
