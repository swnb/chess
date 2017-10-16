import chooseRoom from 'api/chooseroom';
import roomlist from 'api/roomlist';
import HistoryList from 'base/historylist';
import RoomPage from 'base/roompage';
import InitPage from 'com/init-checkboard/initplayer';
import { NetCheckerBoarder, store } from 'com/winner/net';
import React from 'react';
import ReactDom from 'react-dom';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createRoom: false,
            rooms: [],
            intoRoom: false,
            data: {},
            arrP: []
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
        const hocks = {
            err() {
                console.log('err room');
            },
            intoRoom: data => {
                this.setState({
                    data,
                    intoRoom: true
                });
            }
        };
        chooseRoom(roomId, hocks);
    }
    createRoom() {
        this.setState({
            createRoom: true
        });
    }
    componentDidMount() {
        store.subscribe(() => {
            const arrP = store.getState();
            if (Array.isArray(arrP)) {
                this.setState({ arrP });
            } else if (arrP) {
                this.setState(preState => {
                    if (preState.intoRoom && preState.createRoom) {
                        return {
                            intoRoom: true,
                            createRoom: true
                        };
                    } else {
                        return preState.intoRoom
                            ? { intoRoom: false }
                            : { createRoom: false };
                    }
                });
            }
        });

        //钩子
        const hocks = {
            setList: mes => {
                this.updateRoom(mes);
            }
        };
        roomlist(hocks);
    }
    render() {
        if (this.state.intoRoom) {
            const { size, winCount, roomId, room_uuid, side } = this.state.data;
            console.log(size, winCount, roomId, room_uuid, side);
            return (
                <div>
                    <NetCheckerBoarder
                        size={size}
                        winCount={winCount}
                        myturn={side === 'X'}
                        checkerType={side}
                        otherCheckerType={side === 'X' ? 'O' : 'X'}
                        roomId={room_uuid}
                    />
                    <HistoryList
                        size={Math.pow(size, 2)}
                        pos={this.state.arrP}
                    />
                </div>
            );
        }
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
