import 'src/history.css';
import CheckerHistory from 'base/history';
import React from 'react';

import { Tabs, Collapse } from 'antd';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;


function HistoryList(props) {
    const size = Math.sqrt(props.size);
    const list = props.pos.filter(e => e).map((e, i) => {
        return <TabPane tab={`第${i}局`} key={i}>
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

    return <Collapse >
        <Panel header="历史记录" key="1">
            <Tabs
                defaultActiveKey="1"
                tabPosition="left"
                style={{ height: 400 }}
            >
                {list}
            </Tabs>
        </Panel>
    </Collapse>

}

export default HistoryList;



