import React,{useState} from 'react'
import { Collapse,Checkbox} from 'antd';
const { Panel } = Collapse;

function CheckBox(props) {
    // https://ant.design/components/checkbox/

    const [Checked, setChecked] = useState([]) // it saves checked box with id
    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value)
        const newChecked = [...Checked]
        // -1 means that checked index isn't included in the CheckBoxList 
        if(currentIndex === -1) {
            newChecked.push(value);
        } else {
            // it means this one is already checked before, so it should be unchecked 
            newChecked.splice(currentIndex,1);
        }
        setChecked(newChecked);
        props.handleFilterFromCheckBox(newChecked) // send to parent component 
    }

   const renderCheckBoxList = () => props.list && props.list.map((value,index) => (
       <React.Fragment key={index}>
         <Checkbox onChange={() => handleToggle(value._id)} checked={Checked.indexOf(value._id) === -1 ? false : true} />
             <span>{value.name}</span>
       </React.Fragment>
   ))




    return (
        <div>
        <Collapse defaultActiveKey={['1']} >
            <Panel header="continents" key="1">
              {renderCheckBoxList()}
            </Panel>
        </Collapse>
        </div>
    )
}

export default CheckBox
