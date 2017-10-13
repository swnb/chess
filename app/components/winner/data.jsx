import 'src/index.css';

import playing from 'api/playing';
import Checkerboard from 'base/checkerboard';
import Clickbutton from 'base/clickbutton';
import React from 'react';
import win from 'util/win/ifwin';

// import { getAction, store } from 'store/store';

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

class D extends React.Component {
    constructor(props) {
        super(props);
        this.ArrayP = getArrayPosition(size);

        const size = Number(this.props.size);
        this.size = size;
        // this.win_count = Number(this.props.winCount);
        this.win_count = Number(this.props.winCount);
        // const myturn = this.props.myturn;
        // const other = this.props.o;
        // const my = this.props.m;
        this.myturn = false;

        this.state = {
            checkerType: 'X',
            otherCheckerType: 'O',

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
            this.win();
            return flag;
        }
    }
    win() {
        // store.dispatch(getAction([...Array_tmp]));
        this.setStata({
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
        this.nextMove = playing(this.hocks);
    }
    render() {
        const arr_tmp = [...this.state.boxArray].map((e, i) => (
            <Clickbutton
                key={i}
                value={e}
                onClick={() => this.buttonClick(i)}
            />
        ));
        // const state = () => {
        //     if (this.state.next === 'over') {
        //         return '赢的人是 ' + this.winner;
        //     }
        //     return this.state.next ? '下一个棋子是:X' : '下一个棋子是:O';
        // };
        return (
            <div>
                {/* <div className="title">{state()}</div> */}
                <Checkerboard size={Math.sqrt(this.size)} arrP={arr_tmp} />
            </div>
        );
    }
}
// export default { Data, store };
export default D;
