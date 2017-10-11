import HistoryList from 'base/historylist';
import { Checkerplayer, store } from 'com/docker';
import React from 'react';

class Container extends React.Component {
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
        if (this.refs.size.value && this.refs.winCount.value) {
            const size = parseInt(this.refs.size.value);
            const winCount = parseInt(this.refs.winCount.value);
            if (isNaN(size) || isNaN(winCount)) {
                alert('需要数字!来表示棋盘的大小');
            } else {
                this.setState({
                    size: Math.pow(size, 2),
                    winCount: winCount,
                    render: true
                });
            }
        } else {
            alert('需要数字作为棋盘的大小');
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
                    <legend>输入你的希望的棋盘数目</legend>
                    <h3>输入你想需要的棋盘大小</h3>
                    <input type="text" ref="size" />
                    <h3>输入判断输赢的数目</h3>
                    <input type="text" ref="winCount" placeholder="5" />
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

export default Container;
