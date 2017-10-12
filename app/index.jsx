import roomlist from 'api/roomlist';
import RoomPage from 'base/roompage';
import InitPage from 'com/init-checkboard/initplayer';
import React from 'react';
import ReactDom from 'react-dom';

const hocks = {
    setList(data) {
        ReactDom.render(
            <article>
                <InitPage />
                <RoomPage room={data} />
            </article>,
            document.querySelector('.container')
        );
    }
};

roomlist(hocks);
