import 'src/index.css';

import Checkerboard from 'base/checkerboard';
import Clickbutton from 'base/clickbutton';
import React from 'react';

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
        this.win_count = Number(this.props.winCount);

        this.buttonClick = this.buttonClick.bind(this);
    }
    buttonClick(i) {
        if (this.props.myturn) {
            this.getWinner(i);
            this.props.dispatch(i);
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
        // const state = () => {
        //     if (this.state.next === 'over') {
        //         return '赢的人是 ' + this.winner;
        //     }
        //     return this.state.next ? '下一个棋子是:X' : '下一个棋子是:O';
        // };
        return (
            <div>
                {/* <div className="title">{state()}</div> */}
                <Checkerboard
                    size={Math.sqrt(this.props.size)}
                    arrP={arr_tmp}
                />
            </div>
        );
    }
}

export default Checkerplayer;
