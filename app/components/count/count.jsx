import React from 'react';
import { Progress, Avatar } from 'antd'

class Counter extends React.Component {
    constructor(props) {
        super(props);
        // const largeNum = this.props.largeNum;
        //const counting=this.props.counting
        // const timeOut=this.props.timeOut
        this.state = {
            count: 0,
            status: 'active',
        };
    }
    count() {
        this.timeId = setInterval(() => {
            this.setState(pre => ({
                count: pre.count + 1
            }), () => {
                if (this.state.count > this.props.largeNum * 2 / 3) {
                    this.setState({
                        status: 'exception'
                    })
                } else if (
                    this.state.count > this.props.largeNum / 3 &&
                    this.state.count <= this.props.largeNum * 2 / 3
                ) {
                    this.setState({
                        status: 'active'
                    })
                } else if (this.state.count <= this.props.largeNum / 3) {
                    this.setState({
                        status: 'success'
                    })
                }
            });
        }, 1000);
    }
    clear() {
        this.timeId && clearInterval(this.timeId);
        this.setState({ count: 0 });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.counting) {
            this.clear();
            this.count();
        } else {
            this.clear();
        }
    }
    componentWillUpdate(nextProps, nextStates) {
        this.color = undefined;
        if (nextStates.count >= this.props.largeNum) {
            this.clear();
            this.props.timeOut();
        }
    }
    render() {
        const percent = Math.round(this.state.count / parseInt(this.props.largeNum) * 100)
        return (
            <div style={{ width: '80%', margin: '15px auto 15px', textAlign: 'center' }}>
                <Avatar style={{ backgroundColor: "orange", verticalAlign: 'middle' }}>
                    !
                </Avatar> <span>&nbsp;&nbsp;请在进度条完成时间内完成你的下一步</span>
                <Progress
                    showInfo={false}
                    percent={percent}
                    format={() => `${30 - this.state.count}秒`}
                    status={this.state.status}
                />
            </div >
        );

        return
    }
}

export default Counter;
