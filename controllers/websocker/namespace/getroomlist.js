const getRoomList = io => {
    const getList = io.of('/getRoomList');
    getList.on('connect', () => {
        getList.emit('room list', [
            { need: 'X', id: 'one' },
            { need: 'X', id: 'two' }
        ]);
    });
};

module.exports = getRoomList;
