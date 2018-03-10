const apiPath = require('../../../config').path.api
const path = require('path')
const getwinner = require(path.join(apiPath, 'getwinner.js'))

const uuidv5 = require('uuid/v5');

const signRoom = (io, roomId) => {
    const id = uuidv5(roomId, global.NAMESPACE);
    const room = io.of(`/${id}`).on('connection', socket => {
        // socket.on('nextMove', i => {
        //     socket.broadcast.emit('next', i);
        // });
        socket.on('exit', () => {
            socket.broadcast.emit('room distory');
        });
        socket.on('disconnect', () => {
            //一方失去连接
            socket.broadcast.emit('room distory');
        })
        //实验性api
        socket.on('checknext', (arr, index, checkSize, winCount) => {
            getwinner(arr, index, checkSize, winCount, (data) => {
                if (data.trim() === "false") {
                    socket.broadcast.emit('next', index)
                } else {
                    room.emit('winner', index, data.trim())
                }
            })
        })
    });
    return id;
};

module.exports = signRoom;