import makeRoom from 'api/makeroom';
import HistoryList from 'base/historylist';
import { NetCheckerBoarder, store } from 'com/winner/net';
import { Checkerplayer } from 'com/winner/sigel';
import React from 'react';
import CheckerForm from 'com/form/checkform';

class InitPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            size: 0,
            winCount: 5,
            arrP: [],
            netChecker: false
        };
        this.initGame = this.initGame.bind(this);
    }
    initGame(values) {
        const { roomId, passwd, size, winCount } = values;
        const hooks = {
            next: () => {
                alert('你需要等到下一个人进入房间和你玩耍,在这之前,你可以熟悉规则');
                console.log('room made');
                this.setState({
                    size: Math.pow(size, 2),
                    winCount: winCount,
                    render: true
                });
            },
            err() {
                alert('请更新一下房间名看看吧');
            },
            intoRoom: data => {
                this.data = data;
                this.setState({
                    netChecker: true
                });
            }
        };
        makeRoom(roomId, size, winCount, hooks);
    }
    componentDidMount() {
        //相应状态
        store.subscribe(() => {
            const arrP = store.getState();
            if (Array.isArray(arrP)) {
                this.setState({ arrP });
            }
        });
    }
    render() {
        if (!this.state.render) {
            return <CheckerForm initGame={this.initGame} />;
        } else {
            if (this.state.netChecker) {
                const { size, winCount, roomId, room_uuid, side } = this.data;
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
                            size={this.state.size}
                            pos={this.state.arrP}
                        />
                    </div>
                );
            }
            return (
                <div>
                    <Checkerplayer
                        size={this.state.size}
                        winCount={this.state.winCount}
                    />
                    <HistoryList size={this.state.size} pos={this.state.arrP} />
                </div>
            );
        }
    }
}

export default InitPage;
