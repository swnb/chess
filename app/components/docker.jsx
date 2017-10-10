import '../src/index.css';

import { getAction, store } from 'com/store';
import c_win from 'com/util/win/c_win';
import r_c_left_win from 'com/util/win/r_c_left_win';
import r_c_right_win from 'com/util/win/r_c_right_win';
import r_win from 'com/util/win/r_win';
import React from 'react';

// 不要每次全部判断，每次判断这个棋子和它行相同列相同的棋子数目，就行了
function win(arr, arrP, index, win_count) {
    //arr 是真实的棋盘元素对象,arrP是位子元素对象,一一对应[x,y],后面是下落棋子的位子,判断赢的数目
    // const sig = arrP[i];
    const arg = [arr, arrP, arrP[index], index, win_count];
    //行判断
    let flag = r_win(...arg);
    if (flag) {
        return true;
    }
    //列判断
    flag = c_win(...arg);
    if (flag) {
        return true;
    }
    //行列左判断
    flag = r_c_right_win(...arg);
    if (flag) {
        return true;
    }
    //行列右判断
    flag = r_c_left_win(...arg);
    if (flag) {
        return true;
    }
    return false;
}

class Docker extends React.Component {
    constructor(props) {
        super(props);
        const size = Number(this.props.size);
        this.state = {
            next: true,
            boxArray: Array(size).fill(null)
        };
        this.win_count = Number(this.props.winCount);
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
        const arr = [...this.state.boxArray];
        const arr_tmp = arr.map((e, i) => (
            <Box key={i} value={e} onClick={() => this.nextMove(i)} />
        ));
        const item = (start, end) => arr_tmp.slice(start, end + 1);
        const state = () => {
            if (this.state.next === 'over') {
                return '赢的人是 ' + this.winner;
            }
            return this.state.next ? '下一个棋子是:X' : '下一个棋子是:O';
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
                <div className="title">{state()}</div>
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

export { Docker, store };
