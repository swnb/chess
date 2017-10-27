import chooseRoom from 'api/chooseroom';
import roomlist from 'api/roomlist';
import HistoryList from 'base/historylist';
import RoomPage from 'base/roompage';
import InitPage from 'com/init-checkboard/initplayer';
import { NetCheckerBoarder, store } from 'com/winner/net';
import React from 'react';
import ReactDom from 'react-dom';
import { message } from 'antd';
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createRoom: false,
            showRoomList: true,
            intoRoom: false,
            rooms: [],
            data: {},
            arrP: []
        };
        this.createRoom = this.createRoom.bind(this);
        this.getIntoRoom = this.getIntoRoom.bind(this);
    }
    setTrueOnly(stateName) {
        const state = {
            createRoom: false,
            intoRoom: false,
            showRoomList: false
        };
        state[stateName] = true;
        this.setState(state);
    }
    updateRoom(roomList) {
        this.setState({
            rooms: roomList
        });
    }
    getIntoRoom(roomId) {
        const hooks = {
            err() {
                message.info('错误的房间');
            },
            intoRoom: data => {
                this.setState({
                    data
                });
                this.setTrueOnly('intoRoom');
            }
        };
        chooseRoom(roomId, hooks);
    }
    createRoom() {
        this.setTrueOnly('createRoom');
    }
    componentDidMount() {
        store.subscribe(() => {
            const arrP = store.getState();
            if (Array.isArray(arrP)) {
                this.setState({ arrP });
            } else if (arrP) {
                this.setTrueOnly('showRoomList');
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
        }
        if (this.state.showRoomList) {
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
