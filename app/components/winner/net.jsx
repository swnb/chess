import 'src/checker.css';
import 'src/index.css';

import playing from 'api/playing';
import Infolists from 'base/infolist';

import Checkerboard from 'base/checkerboard';
import Clickbutton from 'base/clickbutton';
import Info from 'com/info/info';
import Count from 'com/count/count';
import { notification, Button } from 'antd';
import React from 'react';
import { getAction, store } from 'store/store';
import special from 'util/specialcheck/specialcheck';

class NetCheckerBoarder extends React.Component {
	constructor(props) {
		super(props);

		const [size, winCount, myturn, checkerType, otherCheckerType] = [
			Math.pow(parseInt(this.props.size), 2),
			parseInt(this.props.winCount),
			this.props.myturn,
			this.props.checkerType,
			this.props.otherCheckerType
		];
		this.size = size;
		this.myturn = myturn;
		this.win_count = winCount;

		this.Array_tmp = Array(size).fill(null);

		this.state = {
			info: `规定棋盘是X的先下,你是 ${checkerType} `,
			winhistory: ['processing'],   //'success' 'default' 'processing'
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
		this.clickByMyself = this.clickByMyself.bind(this);
		this.clickByOther = this.clickByOther.bind(this);
		this.timeOut = this.timeOut.bind(this);
		this.win = this.win.bind(this);
	}
	win(array, i, winarr) {
		array = [...array];
		const size = this.size;
		array[i] ? void 0 : array[i] = this.state.otherCheckerType;
		this.setState({ counting: false });
		store.dispatch(getAction([...special(array, parseInt(this.props.size), winarr)]));
		const nextMover = this.state.myturn ? '下一步是对面先下棋' : '下一步是你先下';

		//更新状态标示t
		this.setState(preState => {
			const winhistory = [...preState.winhistory];
			winhistory.pop();
			if (array[i] === this.state.checkerType) {
				winhistory.push('success', 'processing');
				return { winhistory };
			} else {
				winhistory.push('default', 'processing');
				return { winhistory };
			}
		});

		const info = array[i] === this.state.checkerType ? `你赢了,恭喜啊! ${nextMover}` : `对面...赢了 ${nextMover}`;
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
				this.clickByMyself(i);
			} else if (token && token === 'nextMove') {
				//如果是别人发布的
				this.clickByOther(i);
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
		const Array_tmp = [...this.Array_tmp];
		this.dispatch(Array_tmp, i, this.size, this.win_count);
		//更新自己的棋盘
		this.setState({
			boxArray: Array_tmp
		});
	}
	clickByOther(i) {
		this.setState({ newPoint: i });
		this.Array_tmp = [...this.state.boxArray];
		this.Array_tmp[i] = this.state.otherCheckerType;
		const Array_tmp = [...this.Array_tmp];
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

			notification['warning']({
				message: '警告!警告!',
				description: '你长时间没择棋子,请尽快继续,不然将你移除房间!',
				duration: 0,
			});
		} else {
			notification['info']({
				message: '通知!',
				description: '对方没有选择棋子,正在进一步协商,不好意思了',
				duration: 0,
			});
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
				const arr = JSON.parse(arraystring);
				this.win(this.Array_tmp, i, arr);
			}
		};
		//挂钩子
		const { emitNextMove, exitRoom, dispatch } = playing(this.props.roomId, hocks);
		this.nextMove = emitNextMove;
		this.exitRoom = () => {
			exitRoom();
			store.dispatch({ type: 'DESTORY' });
		};
		//test api
		this.dispatch = dispatch;


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


		const winNumber = [this.state.myWinNumber, this.state.otherWinNumber];
		return (
			<div id='net'>
				<div>
					<Infolists winNumber={winNumber} playhistorys={this.state.winhistory} />
				</div>
				<Info info={this.state.info} width={`${parseInt(window.innerWidth * 0.8, 10)}px`} height={'60px'} />
				<Count
					largeNum={30}
					counting={this.state.counting}
					timeOut={this.timeOut}
				/>
				<Checkerboard size={Math.sqrt(this.size)} arrP={arr_tmp} />
				<Button type="danger" onClick={this.exitRoom} style={{ margin: '2% auto', display: 'block' }}> 认输/退出房间</Button>

			</div >
		);
	}
}

export { NetCheckerBoarder, store };
