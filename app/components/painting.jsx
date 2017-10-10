import '../src/index.css';

import React from 'react';

class Painting extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const arr = this.props.pos.map((e, i) => {
            return <button key={i}>{e}</button>;
        });
        const item = (start, end) => arr.slice(start, end + 1);
        console.log(size);
        const size = this.props.size;
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
        return <div className="history">{Q()}</div>;
    }
}

export default Painting;
