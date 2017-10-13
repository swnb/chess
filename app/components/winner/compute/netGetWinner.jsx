import 'src/index.css';

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

class Checkerplayer extends React.Component {
    constructor(props) {
        super(props);
        const myturn = this.props.myturn;
        const size = Number(this.props.size);
        this.checkerType = this.props.checkerType;
        this.state = {
            render: false,
            next: true,
            mytrurn,
            boxArray: Array(size).fill(null)
        };
        this.win_count = Number(this.props.winCount);
        this.buttonClick = this.buttonClick.bind(this);
        this.ArrayP = getArrayPosition(size);
    }
    buttonClick(i) {
        if (this.myturn) {
            this.nextMove(i);
        } else {
        }
    }
    nextMove(i) {
        if (!this.state.boxArray[i]) {
            this.setState(preState => {
                let next = !preState.next;
                let Array_tmp = [...preState.boxArray];
                Array_tmp[i] = this.checkerType;
                const flag = win(Array_tmp, this.ArrayP, i, this.win_count);
                if (flag) {
                    this.winner = next ? 'O' : 'X';
                    store.dispatch(getAction([...Array_tmp]));
                    return {
                        next: 'over',
                        boxArray: Array(Number(this.props.size)).fill(null)
                    };
                }
                return {
                    next,
                    boxArray: Array_tmp
                };
            });
        }
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
            if (this.state.next === 'over') {
                return '赢的人是 ' + this.winner;
            }
            return this.state.next ? '下一个棋子是:X' : '下一个棋子是:O';
        };
        return (
            <div>
                <div className="title">{state()}</div>
                <Checkerboard
                    size={Math.sqrt(this.props.size)}
                    arrP={arr_tmp}
                />
            </div>
        );
    }
}

export { Checkerplayer, store };
