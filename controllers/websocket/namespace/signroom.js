const uuidv5 = require('uuid/v5');
const signRoom = (io, roomId) => {
    const id = uuidv5(roomId, global.NAMESPACE);
    const server = io.of(`/${id}`).on('connection', socket => {
        socket.on('nextMove', i => {
            socket.broadcast.emit('next', i);
        });
        socket.on('exit', () => {
            socket.broadcast.emit('room distory');
        });
        socket.on('disconnect', () => {
            //一方失去连接
            socket.broadcast.emit('room distory');
        });
    });
    return id;
};

module.exports = signRoom;
