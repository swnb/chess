import React from 'react';

function Checkerboard(props) {
    const arr = props.arrP;
    const size = props.size;
    const item = (start, end) => arr.slice(start, end + 1);
    const Q = () => {
        let dom = Array(size);
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
export default Checkerboard;
