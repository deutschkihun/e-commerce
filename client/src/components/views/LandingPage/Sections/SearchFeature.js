import React from 'react'
import {Input} from 'antd'
import "./SearchFeature.css"
const {Search} = Input

function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState("")
    const searchHandler = (event) => {
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    return (
        <div>
            <Search
                className="searchBox"
                placeholder="input search text"
                onChange={searchHandler}
                value={SearchTerm}
            />
        </div>
    )
}

export default SearchFeature
