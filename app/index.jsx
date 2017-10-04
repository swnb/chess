import './src/index.css';

import React from 'react';
import ReactDom from 'react-dom';

function Formdata(props) {
    return <h1 onClick={props.onClick}>{props.data}</h1>;
}
class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            one: 12,
            two: 14
        };
        this.clickEvent = this.clickEvent.bind(this);
    }
    clickEvent() {
        this.setState(preState => ({
            one: preState.one + 'zz'
        }));
    }
    render() {
        return (
            <div>
                <Formdata onClick={this.clickEvent} data={this.state.one} />
                <h2 onClick={this.clickEvent}>{this.state.two}</h2>
            </div>
        );
    }
}

ReactDom.render(<Test />, document.querySelector('.container'));

// 运行js直到<>就被当成html 运行html直到{}
