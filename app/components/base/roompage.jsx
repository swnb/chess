import 'src/homepage.css';

import React from 'react';

function RoomPage(props) {
    let roomList = props.room.map((e, i) => {
        const title = `房间名称 ${e.id}`;
        const info = `棋盘大小${e.module.size}  ${e.module.winCount}子棋`;
        const div = (
            <div
                className="info"
                roomid={e.id}
                onClick={props.getIntoRoom}
                key={i}
            >
                <article>{title}</article>
                {info}
            </div>
        );
        return div;
    });
    roomList.push(
        <div
            className="createRoom"
            onClick={props.onClick}
            key={props.room.length}
        >
            自定义你的房间
        </div>
    );
    return <div className="roomlist">{roomList}</div>;
}
export default RoomPage;
