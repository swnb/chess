import './src/index.css';

import React from 'react';
import ReactDom from 'react-dom';

// 不要每次全部判断，每次判断这个棋子和它行相同列相同的棋子数目，就行了
function win(arr, arrP, i, win_count) {
    const sig = arrP[i];
    //行判断
    const r_num = arrP.filter((e, iP) => {
        if (!arr[iP]) {
            return false;
        }
        //不要让他超出限制
        //行数相同
        if (arrP[iP][0] === sig[0]) {
            //元素相同
            if (arr[i] === arr[iP]) {
                return true;
            }
        }
    }).length;
    if (r_num === win_count) {
        return true;
    }
    const c_num = arrP.filter((e, iP) => {
        if (!arr[iP]) {
            return false;
        }
        //列
        if (arrP[iP][1] === sig[1]) {
            //元素相同
            if (arr[i] === arr[iP]) {
                return true;
            }
        }
    }).length;
    if (c_num === win_count) {
        return true;
    }
    //行列判断
    const r_c_num_r = arrP.filter((e, iP) => {
        if (!arr[iP]) {
            return false;
        }
        //对角线相同
        if (arrP[iP][0] - sig[0] === arrP[iP][1] - sig[1]) {
            //元素相同
            if (arr[i] === arr[iP]) {
                return true;
            }
        }
    }).length;
    if (r_c_num_r === win_count) {
        return true;
    }
    const r_c_num_l = arrP.filter((e, iP) => {
        if (!arr[iP]) {
            return false;
        }
        //对角线相同
        if (arrP[iP][0] - sig[0] === sig[1] - arrP[iP][1]) {
            //元素相同
            if (arr[i] === arr[iP]) {
                return true;
            }
        }
    }).length;
    if (r_c_num_l === win_count) {
        return true;
    }
    return false;
}

class Docker extends React.Component {
    constructor(props) {
        super(props);
        const size = Number(props.size);
        this.state = {
            next: true,
            boxArray: Array(size).fill(null)
        };
        this.nextMove = this.nextMove.bind(this);
        this.ArrayP = this.getArrayPosition(size);
    }
    getArrayPosition(size) {
        const r_l = Math.sqrt(size);
        let arr = [];
        for (let r = 1; r <= r_l; r++) {
            for (let c = 1; c <= r_l; c++) {
                arr.push([r, c]);
            }
        }
        return arr;
    }
    nextMove(i) {
        if (!this.state.boxArray[i]) {
            this.setState(preState => {
                let next = !preState.next;
                let Array_tmp = [...preState.boxArray];
                Array_tmp[i] = next ? 'O' : 'X';
                const flag = win(Array_tmp, this.ArrayP, i, 3);
                if (flag) {
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
        console.log(this.state.boxArray);
        const arr = [...this.state.boxArray];
        const arr_tmp = arr.map((e, i) => (
            <Box key={i} value={e} onClick={() => this.nextMove(i)} />
        ));
        const item = (start, end) => arr_tmp.slice(start, end + 1);
        const state = () => {
            if (this.state.next === 'over') {
                return 'over';
            }
            return this.state.next ? 'X' : 'O';
        };
        const size = Math.sqrt(Number(this.props.size));
        const Q = () => {
            let dom = [];
            let index = 0;
            for (let i = 0; i < size; i++) {
                dom.push(
                    <div className="line" key={i}>
                        {item(index, index + size - 1)}
                    </div>
                );
                index += size;
            }
            return dom;
        };
        return (
            <div>
                <div className="line">{state()}</div>
                {Q()}
            </div>
        );
    }
}
class Box extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <button onClick={this.props.onClick}>{this.props.value}</button>;
    }
}

class Show extends React.Component {}
ReactDom.render(<Docker size="16" />, document.querySelector('.container'));
