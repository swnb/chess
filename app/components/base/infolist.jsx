import React from 'react'
import { List, Avatar, Badge } from 'antd';

function Infolists(props) {
    let myhistory = []
    let otherhistory = []
    props.playhistorys.forEach(ele => {
        switch (ele) {
            case "success":
                myhistory.push(<Badge status="success" />)
                otherhistory.push(<Badge status="default" />)
                break
            case "default":
                otherhistory.push(<Badge status="success" />)
                myhistory.push(<Badge status="default" />)
                break
            case "processing":
                otherhistory.push(<Badge status="processing" />)
                myhistory.push(<Badge status="processing" />)
        }
    })

    const data = [
        {
            title: '你的数据',
            backgroundColor: '#87d068',
            playhistory: myhistory
        },
        {
            title: '对方的数据',
            backgroundColor: 'rgb(77, 204, 169)',
            playhistory: otherhistory
        },
    ];

    return (
        <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
                <List.Item
                >
                    <List.Item.Meta
                        avatar={<Avatar style={{ backgroundColor: item.backgroundColor }} icon="user" />}
                        title={<h3 >{item.title}</h3>}
                        description={item.playhistory}
                    />
                </List.Item>
            )}
        />
    )
}

export default Infolists