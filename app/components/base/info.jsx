import React from 'react';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deg: 0,
            info: undefined
        };
        this.time = 1500;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.info === this.state.info) {
            return;
        }
        this.setState(preState => ({
            deg: preState.deg + 120
        }));
        setTimeout(() => {
            this.setState({
                info: nextProps.info
            });
        }, this.time / 2);
    }
    render() {
        const info_dom = (
            <div
                className="title"
                style={{ transform: `rotateY(${this.state.deg}deg)` }}
            >
                <div className="front">{this.state.info}</div>
                <div className="left">{this.state.info}</div>
                <div className="right">{this.state.info}</div>
            </div>
        );
        return info_dom;
    }
}

export default Info;
