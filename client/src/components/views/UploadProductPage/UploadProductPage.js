import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUploads from "../../utils/FileUploads";
import "./UploadProductPage.css";
import axios from 'axios';

const { TextArea } = Input;
const Continents = [
    {key:1,value:"Africa"},
    {key:2,value:"Europe"},
    {key:3,value:"Asia"},
    {key:4,value:"North America"},
    {key:5,value:"South America"},
    {key:6,value:"Australia"},
    {key:7,value:"Antarctica"},
]

function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const updateImage = (newImage) => {
        setImages(newImage);
    }


    return (
        <div className="uploadContainer">
            <div className="subContainer">
                <h2>travle package upload</h2>
            </div>

            <Form>
                {/* DropZone */}
                <FileUploads refreshFunction={updateImage}/>

                <br />
                <br />
                <label>name</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>description</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>가격($)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <select onChange={continentChangeHandler} value={Continent}>
                     {/* 2 different variation for same code 
                    Error handling : Expected an assignment or function call and instead saw an expression (return issue) */}
                    
                    {/* {Continents.map((item) => {
                    return (
                    <option key={item.key} value={item.value}>{item.value}</option>
                    )})} */}

                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <button type="submit">
                    confirm
                </button>
            </Form>


        </div>
    )
}

export default UploadProductPage
