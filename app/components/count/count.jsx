import React from 'react';

class counter extends React.Component {
    constructor(props) {
        super(props);
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
    render() {
        if (this.props.start) {
            this.count();
        }
        if (this.props.stop) {
            this.clear();
        }
        return <div>{this.state.count}</div>;
    }
}
