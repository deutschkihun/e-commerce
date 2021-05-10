import React,{useState} from 'react'
import {Collapse,Radio} from 'antd';
const { Panel } = Collapse;

function RadioBox(props) {
    // https://ant.design/components/radio/

    const [Value, setValue] = useState(0);
 
    const renderRadioBox = () => (
        props.list && props.list.map(value => (
            <Radio key={value._id} value={value._id}> {value.name} </Radio>
        ))
    )

    const handleChange = (event) => {
        // event.target used for current targed element 
        setValue(event.target.value)
        props.handleFilterFromRadioBox(event.target.value)
    }


    return (
        <div>
        <Collapse defaultActiveKey={['0']} >
            <Panel header="Price" key="1">
                <Radio.Group onChange={handleChange} value={Value}>
                    {renderRadioBox()}
                </Radio.Group>
            </Panel>
        </Collapse>
        </div>
    )
}

export default RadioBox
