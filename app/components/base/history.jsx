import 'src/index.css';

import Checkerboard from 'base/checkerboard';
import React from 'react';

function CheckerHistory(props) {
    const arr = props.pos.map((e, i) => {
        return <button key={i}>{e}</button>;
    });
    return (
        <div className="history">
            <Checkerboard size={props.size} arrP={arr} />
        </div>
    );
}

export default CheckerHistory;
