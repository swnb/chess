import Painting from 'com/painting';
import React from 'react';

class winnerPainting extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const size = Math.sqrt(this.props.size);
        const list = this.props.pos.filter(e => e).map((e, i) => {
            return <Painting key={i} size={size} pos={e} />;
        });
        return <div className="list">{list}</div>;
    }
}

export default winnerPainting;
