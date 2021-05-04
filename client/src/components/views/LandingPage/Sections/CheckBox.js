import React from 'react'
import { Collapse,Checkbox} from 'antd';

const { Panel } = Collapse;

function CheckBox() {
    return (
        <div>
        <Collapse defaultActiveKey={['1']} onChange={callback}>
            <Panel header="This is panel header 1" key="1">
                <Checkbox>This is Checkbox</Checkbox>
            </Panel>
        </Collapse>
        </div>
    )
}

export default CheckBox
