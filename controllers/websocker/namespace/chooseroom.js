const chooseRoom = io => {
    const choose = io.of('/chooseRoom');
    choose.on('connect', () => {
        choose.on('choose room', roomId => {
            //take a look
            choose.emit('room', roomId);
        });
    });
};

module.exports = chooseRoom;
