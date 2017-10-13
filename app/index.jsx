import chooseRoom from 'api/chooseroom';
import roomlist from 'api/roomlist';
import RoomPage from 'base/roompage';
import InitPage from 'com/init-checkboard/initplayer';
import React from 'react';
import ReactDom from 'react-dom';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createRoom: false,
            rooms: []
        };
        this.createRoom = this.createRoom.bind(this);
        this.getIntoRoom = this.getIntoRoom.bind(this);
    }
    updateRoom(mes) {
        this.setState({
            rooms: mes
        });
    }
    getIntoRoom(e) {
        const roomId = e.target.getAttribute('roomid');
        chooseRoom(roomId);
    }
    createRoom() {
        this.setState({
            createRoom: true
        });
    }
    componentDidMount() {
        //钩子
        const hocks = {
            setList: mes => {
                this.updateRoom(mes);
            }
        };
        roomlist(hocks);
    }
    render() {
        if (this.state.createRoom) {
            return <InitPage />;
        } else {
            return (
                <RoomPage
                    room={this.state.rooms}
                    onClick={this.createRoom}
                    getIntoRoom={this.getIntoRoom}
                />
            );
        }
    }
}

ReactDom.render(<Index />, document.querySelector('.container'));
