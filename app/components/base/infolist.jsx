import React from 'react';

import { List, Avatar, Badge } from 'antd';


function Infolists(props) {
    const winNumber = [...props.winNumber]
    let otherhistory = []
    let myhistory = []
    props.playhistorys.forEach((ele, i) => {
        switch (ele) {
            case "success":
                myhistory.push(<Badge key={i} status="success" />)
                otherhistory.push(<Badge key={i} status="default" />)
                break
            case "default":
                otherhistory.push(<Badge key={i} status="success" />)
                myhistory.push(<Badge key={i} status="default" />)
                break
            case "processing":
                otherhistory.push(<Badge key={i} status="processing" />)
                myhistory.push(<Badge key={i} status="processing" />)
        }
    })
    const data = [
        {
            title: `我方的数据 胜 ${winNumber[0]} - 负 ${winNumber[1]}`,
            backgroundColor: '#87d068',
            playhistory: myhistory
        },
        {
            title: `对方的数据 胜 ${winNumber[1]} - 负 ${winNumber[0]}`,
            backgroundColor: 'rgb(77, 204, 169)',
            playhistory: otherhistory
        },
    ];

    return <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
            <List.Item
            >
                <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: item.backgroundColor }} icon="user" />}
                    title={item.title}
                    description={item.playhistory}
                />
            </List.Item>
        )}
    />
}

export default Infolists