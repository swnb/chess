import 'src/history.css';

import Checkerboard from 'base/checkerboard';
import React from 'react';

function CheckerHistory(props) {
    const specialColor = 'orange'
    const arr = props.pos.map((e, i) => {
        if (e !== null && typeof e === 'object' && e.special) {
            return <button key={i} style={{ backgroundColor: specialColor }}>{e.value}</button>
        }
        return <button key={i}>{e}</button>;
    });
    return (
        <div className="history">
            <Checkerboard size={props.size} arrP={arr} />
        </div>
    );
}

export default CheckerHistory;
