import io from 'socket.io-client';
//{err(),success(),errRoom()}
const passwdComfirm = ({
    roomId,
    passwd
}, hooks) => {
    const socket = io('/passwdconfirm');
    socket.emit('passwd confirm', {
        roomId,
        passwd
    });
    socket.on('err passwd', () => {
        hooks.err();
    });
    socket.on('passwd success', () => {
        hooks.success();
    });
    socket.on('err room', () => {
        hooks.errRoom();
    });
};
export default passwdComfirm;