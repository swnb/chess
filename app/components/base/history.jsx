import 'src/index.css';

import Checkerboard from 'base/checkerboard';
import React from 'react';

class CheckerHistory extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const arr = this.props.pos.map((e, i) => {
            return <button key={i}>{e}</button>;
        });
        return (
            <div className="history">
                <Checkerboard size={this.props.size} arrP={arr} />
            </div>
        );
    }
}

export default CheckerHistory;
