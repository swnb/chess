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
        this.ArrayP = getArrayPosition(size);

        this.state = {
            checkerType,
            otherCheckerType,
            boxArray: Array(size).fill(null)
        };

        //钩子函数,接受信息的时候
        this.hocks = {
            connect() {
                console.log('connect');
            },
            next: i => {
                //被动更新自己的棋盘

                let Array_tmp = [...this.state.boxArray];
                Array_tmp[i] = this.state.otherCheckerType;
                const flag = this.getWinner(Array_tmp, i);
                if (!flag) {
                    this.myturn = true;
                    this.setState({ boxArray: Array_tmp });
                }
            }
        };

        this.buttonClick = this.buttonClick.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this.win = this.win.bind(this);
    }
    getWinner(array, i) {
        const flag = win(array, this.ArrayP, i, this.win_count);
        if (flag) {
            this.win(array);
            return flag;
        }
    }
    win(array) {
        const size = this.size;
        store.dispatch(getAction([...array]));
        this.setState({
            boxArray: Array(size).fill(null)
        });
    }
    lose() {}
    dispatch(i) {
        //你不可以下棋了
        this.myturn = false;
        //发布信息更新对方的棋盘
        this.nextMove(i);
        //更新自己的棋盘
        let Array_tmp = [...this.state.boxArray];
        Array_tmp[i] = this.state.checkerType;
        const flag = this.getWinner(Array_tmp, i);
        if (!flag) {
            this.setState({ boxArray: Array_tmp });
        }
    }
    buttonClick(i) {
        if (this.myturn) {
            //发布点击信息
            this.dispatch(i);
        }
    }
    componentDidMount() {
        //挂钩子
        this.nextMove = playing(this.props.roomId, this.hocks);
    }
    render() {
        const arr_tmp = [...this.state.boxArray].map((e, i) => (
            <Clickbutton
                key={i}
                value={e}
                onClick={() => this.buttonClick(i)}
            />
        ));
        const state = () => {
            return this.state.info ? '下一个棋子是:X' : '下一个棋子是:O';
        };
        return (
            <div>
                {<div className="title">{state()}</div>}
                <Checkerboard size={Math.sqrt(this.size)} arrP={arr_tmp} />
            </div>
        );
    }
}

export { NetCheckerBoarder, store };
