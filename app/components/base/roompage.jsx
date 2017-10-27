import 'src/homepage.css';

import React from 'react';
import Passwd from 'com/form/passwd';
import { Card, Col, Row } from 'antd';
function arr_sort(arr, num = 3) {
    let arr_tmp = [];
    function sort(arr) {
        if (arr.length >= num) {
            let arr_num = [];
            for (var i = 0; i < num; i++) {
                arr_num.push(arr.pop());
            }
            arr_tmp.push(arr_num);
            sort(arr);
        } else {
            arr_tmp.push(arr);
        }
    }
    sort(arr);
    return arr_tmp;
}

function RoomPage(props) {
    let roomList = props.room.map((e, i) => {
        const title = `房间名称 ${e.id}`;
        const dom = (
            <Col span={8} key={i}>
                <Card
                    title={title}
                    extra={
                        <Passwd
                            roomId={e.id}
                            getIntoRoom={() => {
                                props.getIntoRoom(e.id);
                            }}
                        />
                    }
                    style={{ maxWidth: 300 }}
                >
                    <p>{`棋盘大小${e.module.size}`}</p>
                    <p>{`${e.module.winCount}子棋`}</p>
                </Card>
            </Col>
        );
        return dom;
    });
    roomList.push(
        <Col span={8} key={props.room.length}>
            <Card
                extra={
                    <a href="#" onClick={props.onClick}>
                        创建房间
                    </a>
                }
                title={'自己定制房间'}
                style={{ maxWidth: 300 }}
            >
                <p>棋盘大小自定义</p>
                <p>输赢判断自定义</p>
            </Card>
        </Col>
    );
    return (
        <div className="roomList">
            <Row gutter={16}>{roomList}</Row>
        </div>
    );
}
export default RoomPage;
