import makeRoom from 'api/makeroom';
import HistoryList from 'base/historylist';
import { Checkerplayer, store } from 'com/winner/getwinner';
import React from 'react';

class InitPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            size: 0,
            winCount: 5,
            arrP: []
        };
        this.initGame = this.initGame.bind(this);
    }
    initGame() {
        if (
            this.refs.size.value &&
            this.refs.winCount.value &&
            this.refs.roomid.value
        ) {
            const [size, winCount, roomid] = [
                parseInt(this.refs.size.value),
                parseInt(this.refs.winCount.value),
                this.refs.roomid.value
            ];
            if (isNaN(size) || isNaN(winCount)) {
                alert('需要数字!来表示棋盘的大小或者输赢规则');
            } else {
                const hocks = {
                    next() {
                        console.log('yes');
                    },
                    err() {
                        alert('请更新一下房间名看看吧');
                    }
                };
                // this.setState({
                //     size: Math.pow(size, 2),
                //     winCount: winCount,
                //     render: true
                // });
                makeRoom(roomid, size, winCount, hocks);
            }
        } else {
            alert('需要全部填写');
        }
    }
    componentDidMount() {
        //相应状态
        store.subscribe(() => {
            const arrP = store.getState();
            this.setState({ arrP });
        });
    }
    render() {
        if (!this.state.render) {
            return (
                <fieldset>
                    <legend>输入你的棋盘和期望</legend>
                    <h3>棋盘大小</h3>
                    <input type="text" ref="size" required />
                    <span>
                        <h4>n x n的棋盘 输入 n</h4>
                    </span>
                    <h3>输入判断输赢的数目</h3>
                    <input
                        type="text"
                        ref="winCount"
                        placeholder="5"
                        required
                    />
                    <span>
                        <h4>5子相连胜出输入5</h4>
                    </span>
                    <h3>为了公平,选边是系统随机决定</h3>
                    <h3>设置你的roomid</h3>
                    <input type="text" ref="roomid" required />
                    <button onClick={this.initGame}>开始棋盘游戏</button>
                </fieldset>
            );
        } else {
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
