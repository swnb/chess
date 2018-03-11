import 'src/history.css';
import CheckerHistory from 'base/history';
import React from 'react';

import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;



function HistoryList(props) {
    const size = Math.sqrt(props.size);
    const list = props.pos.filter(e => e).map((e, i) => {
        return <TabPane tab={`Tab ${i}`} key={i}>
            <CheckerHistory
                size={
                    size
                }
                pos={
                    e
                }
            />
        </TabPane>
    });

    return <div style={{ marginTop: "10px" }}>
        <Tabs
            defaultActiveKey="1"
            tabPosition="left"
            style={{ height: 600 }}
        >
            {list}
        </Tabs>
    </div>
}

export default HistoryList;



