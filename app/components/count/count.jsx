import React from 'react';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        // const largeNum = this.props.largeNum;
        //const counting=this.props.counting
        // const timeOut=this.props.timeOut
        this.state = {
            count: 0
        };
    }
    count() {
        this.timeId = setInterval(() => {
            this.setState(pre => ({
                count: pre.count + 1
            }));
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
    render() {
        let color = undefined;
        if (this.state.count >= this.props.largeNum) {
            this.clear();
            this.props.timeOut();
        } else if (this.state.count > this.props.largeNum * 2 / 3) {
            color = 'red';
        } else if (
            this.state.count > this.props.largeNum / 3 &&
            this.state.count <= this.props.largeNum * 2 / 3
        ) {
            color = 'orange';
        } else if (this.state.count <= this.props.largeNum / 3) {
            color = 'blue';
        }
        return (
            <div className="counter">
                请在限定时间内完成你的下一步<span style={{ color: color }}>
                    {30 - this.state.count}
                </span>
            </div>
        );
    }
}

export default Counter;
