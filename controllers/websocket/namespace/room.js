let hock = {};
const room = io => {
    const room = io.of('/room');
    hock.listChange = () => {};
};

module.exports = { room, hock };
