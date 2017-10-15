import 'src/index.css';

import playing from 'api/playing';
import Checkerboard from 'base/checkerboard';
import Clickbutton from 'base/clickbutton';
import React from 'react';
import { getAction, store } from 'store/store';
import win from 'util/win/ifwin';

//生成点阵
function getArrayPosition(size) {
    const r_l = Math.sqrt(size);
    let arr = [];
    for (let r = 1; r <= r_l; r++) {
        for (let c = 1; c <= r_l; c++) {
            arr.push([r, c]);
        }
    }
    return arr;
}

class NetCheckerBoarder extends React.Component {
    constructor(props) {
        super(props);

        const [size, winCount, myturn, checkerType, otherCheckerType] = [
            Math.pow(Number(this.props.size), 2),
            Number(this.props.winCount),
            this.props.myturn,
            this.props.checkerType,
            this.props.otherCheckerType
        ];
        this.size = size;
        this.myturn = myturn;
        this.win_count = winCount;
        //生成点阵
        this.ArrayP = getArrayPosition(size);

        this.state = {
            info: `X 先下,你是 ${checkerType} `,
            checkerType,
            otherCheckerType,
            newPoint: undefined,
            boxArray: Array(size).fill(null)
        };

        //钩子函数,接受信息的时候
        this.hocks = {
            connect() {
                console.log('connect');
            },
            next: i => {
                //被动更新自己的棋盘
                this.buttonClick(i, 'nextMove');
            }
        };

        this.buttonClick = this.buttonClick.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this.win = this.win.bind(this);
    }
    getWinner(array, i) {
        const flag = win(array, this.ArrayP, i, this.win_count);
        if (flag) {
            this.win(array, i);
            return flag;
        }
    }
    win(array, i) {
        const size = this.size;
        store.dispatch(getAction([...array]));
        const winnerInfo =
            array[i] === this.state.checkerType ? '你赢了,恭喜啊!' : '对面...赢了';
        const info = `${winnerInfo}`;
        this.setState({
            boxArray: Array(size).fill(null)
        });
        this.setState({
            info
        });
    }
    lose() {}
    dispatch(i) {
        //判断
        if (this.myturn) {
            //你不可以下棋了
            this.myturn = false;
            const info = `该对方下棋了 ${this.state.otherCheckerType}`;
            this.setState({
                info
            });
            //发布信息更新对方的棋盘
            this.nextMove(i);
            let Array_tmp = [...this.state.boxArray];
            Array_tmp[i] = this.state.checkerType;
            const flag = this.getWinner(Array_tmp, i);
            //更新自己的棋盘
            if (!flag) {
                this.setState({ boxArray: Array_tmp });
            }
        } else {
            let Array_tmp = [...this.state.boxArray];
            Array_tmp[i] = this.state.otherCheckerType;
            const flag = this.getWinner(Array_tmp, i);
            if (!flag) {
                this.myturn = true;
                const info = `该你下棋了 ${this.state.checkerType}`;
                this.setState({
                    info
                });
                this.setState({ boxArray: Array_tmp });
            }
        }
    }
    buttonClick(i, token = null) {
        if (this.myturn || token === 'nextMove') {
            this.setState({ newPoint: i });
            //发布点击信息
            this.dispatch(i);
        }
    }
    componentDidMount() {
        //挂钩子
        this.nextMove = playing(this.props.roomId, this.hocks);
    }
    render() {
        const arr_tmp = [...this.state.boxArray].map((e, i) => {
            return (
                <Clickbutton
                    key={i}
                    value={e}
                    onClick={() => {
                        this.buttonClick(i);
                    }}
                />
            );
        });
        return (
            <div>
                {<div className="title">{this.state.info}</div>}
                <Checkerboard size={Math.sqrt(this.size)} arrP={arr_tmp} />
            </div>
        );
    }
}

export { NetCheckerBoarder, store };
