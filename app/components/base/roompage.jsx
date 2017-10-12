import 'src/homepage.css';

import React from 'react';

function RoomPage(props) {
    let roomList = props.room.map((e, i) => {
        const info = `这里缺少的人是 ${e.need}`;
        const div = (
            <div className="info" key={i}>
                {info}
            </div>
        );
        return div;
    });
    roomList.push(
        <div className="createRoom" key={props.room.length}>
            自定义你的房间
        </div>
    );
    return <div class="roomlist">{roomList}</div>;
}
export default RoomPage;
