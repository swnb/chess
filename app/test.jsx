import chooseRoom from 'api/chooseroom';
import NetCheckerBoarder from 'com/winner/net';
import React from 'react';
import ReactDOM from 'react-dom';

const hocks = {
    err() {
        console.log('err room');
    },
    intoRoom(data) {
        const { size, winCount, roomId, room_uuid, side } = data;
        console.log(size, winCount, roomId, room_uuid, side);
        ReactDOM.render(
            <NetCheckerBoarder
                size={size}
                winCount={winCount}
                myturn={side === 'X'}
                checkerType={side}
                otherCheckerType={side === 'X' ? 'O' : 'X'}
                roomId={room_uuid}
            />,
            document.querySelector('.container')
        );
    }
};
chooseRoom('www', hocks);
