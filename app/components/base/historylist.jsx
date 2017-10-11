import CheckerHistory from 'base/history';
import React from 'react';

function HistoryList(props) {
    const size = Math.sqrt(props.size);
    const list = props.pos.filter(e => e).map((e, i) => {
        return <CheckerHistory key={i} size={size} pos={e} />;
    });
    return <div className="list">{list}</div>;
}

export default HistoryList;
