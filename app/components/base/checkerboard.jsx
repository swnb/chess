import React from 'react';

class Checkerboard extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const arr = this.props.arrP;
        const size = this.props.size;
        const item = (start, end) => arr.slice(start, end + 1);
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
        return Q();
    }
}

export default Checkerboard;
