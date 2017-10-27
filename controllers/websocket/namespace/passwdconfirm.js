const passwdConfirm = io => {
    const passwd = io.of('/passwdconfirm').on('connection', socket => {
        const passwdConfirmFunc = ({ roomId, passwd }) => {
            if (global.id.includes(roomId)) {
                const realPasswd = global.emptyRoomList.getPasswd(roomId);
                if (!realPasswd) {
                    socket.emit('passwd success');
                } else if (realPasswd === passwd) {
                    socket.emit('passwd success');
                } else {
                    socket.emit('err passwd');
                }
            } else {
                socket.emit('err room');
            }
        };
        socket.on('passwd confirm', passwdConfirmFunc);
    });
};

module.exports = passwdConfirm;
