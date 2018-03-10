import 'src/checker.css';
import 'src/index.css';

import playing from 'api/playing';
import Checkerboard from 'base/checkerboard';
import Clickbutton from 'base/clickbutton';
import Info from 'base/info';
import Count from 'com/count/count';
import { message } from 'antd';
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
        // this.ArrayP = getArrayPosition(size);

        this.Array_tmp = Array(size).fill(null)

        this.state = {
            info: `规定棋盘是X的先下,你是 ${checkerType} `,
            checkerType,
            otherCheckerType,
            myWinNumber: 0,
            otherWinNumber: 0,
            myturn,
            counting: false,
            newPoint: undefined,
            boxArray: Array(size).fill(null)
        };

        this.buttonClick = this.buttonClick.bind(this);
        this.clickByMyself = this.clickByMyself.bind(this)
        this.clickByOther = this.clickByOther.bind(this)
        this.dispatch = this.dispatch.bind(this);
        this.timeOut = this.timeOut.bind(this);
        this.win = this.win.bind(this);
    }
    getWinner(array, i) {
        const flag = win(array, this.ArrayP, i, this.win_count);
        if (flag) {
            this.win(array, i);
            return flag;
        }
    }
    win(array, i, winarr) {
        const size = this.size;
        this.setState({ counting: false });
        store.dispatch(getAction([...array]));
        const nextMover = this.state.myturn ? '下一步是对面先下棋' : '下一步是你先下';
        const winnerInfo =
            array[i] === this.state.checkerType
                ? `你赢了,恭喜啊! ${nextMover}`
                : `对面...赢了 ${nextMover}`;
        const info = `${winnerInfo}`;
        this.setState(preState => {
            const [myWinNumber, otherWinNumber] =
                array[i] === this.state.checkerType
                    ? [preState.myWinNumber + 1, preState.otherWinNumber]
                    : [preState.myWinNumber, preState.otherWinNumber + 1];
            //作为转变的是之前哦myturn;
            this.myturn = !preState.myturn;
            return {
                info,
                myWinNumber,
                otherWinNumber,
                boxArray: Array(size).fill(null),
                checkerType: preState.otherCheckerType,
                otherCheckerType: preState.checkerType,
                myturn: !preState.myturn
            };
        });
    }
    buttonClick(i, token = null) {
        //如果棋子存在不作处理
        if (!this.state.boxArray[i]) {
            //如果是我点击的
            if (this.myturn) {
                this.clickByMyself(i)
            } else if (token && token === 'nextMove') {
                //如果是别人发布的
                this.clickByOther(i)
            }
        }
    }
    clickByMyself(i) {
        this.myturn = false;
        this.setState({
            counting: true
        });
        const info = `该对方下棋了 ${this.state.otherCheckerType}`;
        this.setState({
            info
        });
        this.Array_tmp = [...this.state.boxArray];
        this.Array_tmp[i] = this.state.checkerType;
        const Array_tmp = [...this.Array_tmp]
        this.testApi(Array_tmp, i, this.size, this.win_count)
        //更新自己的棋盘
        this.setState({
            boxArray: Array_tmp
        });
    }
    clickByOther(i) {
        this.setState({ newPoint: i });
        this.Array_tmp = [...this.state.boxArray];
        this.Array_tmp[i] = this.state.otherCheckerType;
        const Array_tmp = [...this.Array_tmp]
        this.myturn = true;
        this.setState({
            counting: true
        });
        const info = `该你下棋了 ${this.state.checkerType}`;
        this.setState({
            info
        });
        this.setState({
            boxArray: Array_tmp
        });

    }
    destoryRoom() {
        store.dispatch({ type: 'DESTORY' });
    }
    timeOut() {
        if (this.state.myturn) {
            message.info('你长时间没择棋子,请点击确定,不然将你移除房间!');
        } else {
            message.info('对面超时了,很抱歉,正在进一步协商');
        }
    }
    componentDidMount() {
        //钩子函数,接受信息的时候
        const hocks = {
            connect() {
                console.log('connect');
            },
            next: i => {
                //被动更新自己的棋盘
                this.buttonClick(i, 'nextMove');
            },
            destory: () => {
                this.destoryRoom();
            },
            winner: (i, arraystring) => {
                const arr = JSON.parse(arraystring)
                console.log(arr)
                this.win(this.Array_tmp, i, arr)
            }
        };
        //挂钩子
        const { emitNextMove, exitRoom, testApi } = playing(this.props.roomId, hocks);
        this.nextMove = emitNextMove;
        this.exitRoom = () => {
            exitRoom();
            store.dispatch({ type: 'DESTORY' });
        };
        //test api
        this.testApi = testApi


        this.clearNewPoint = setTimeout(() => {
            console.log('开始了');
        });
    }
    render() {
        const arr_tmp = [...this.state.boxArray].map((e, i) => {
            const newPoint = i === this.state.newPoint;
            if (newPoint) {
                clearTimeout(this.clearNewPoint);
                this.clearNewPoint = setTimeout(() => {
                    this.setState({
                        newPoint: undefined
                    });
                }, 1000);
            }
            return (
                <Clickbutton
                    newPoint={newPoint}
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
                <div className="winCount">
                    <div>你赢的数目是 {`${this.state.myWinNumber}`}</div>
                    <div>对面赢的数目是 {`${this.state.otherWinNumber}`}</div>
                </div>
                <Info info={this.state.info} />
                <Count
                    largeNum={30}
                    counting={this.state.counting}
                    timeOut={this.timeOut}
                />
                <Checkerboard size={Math.sqrt(this.size)} arrP={arr_tmp} />
                <button className="exitButton" onClick={this.exitRoom}>
                    认输/退出房间
                </button>
            </div>
        );
    }
}

export { NetCheckerBoarder, store };
