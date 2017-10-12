const chooseRoom = io => {
    const choose = io.of('/chooseRoom');
    choose.on('connect', () => {});
};

module.exports = chooseRoom;
