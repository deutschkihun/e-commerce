import React, {useState} from 'react'
import {Button, Form, Input} from "antd";
import "./UploadProductPage.css";

const {TextArea} = Input;
const ContinentsList = [
    {key:1,value:"Africa"},
    {key:2,value:"Europe"},
    {key:3,value:"Asia"},
    {key:4,value:"North America"},
    {key:5,value:"South America"},
    {key:6,value:"Australia"},
    {key:7,value:"Antarctica"},
]

function UploadProductPage() {

    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState(0);
    const [Continents, setContinents] = useState(1);
    const [Images, setImages] = useState([]);

    const titleChangeHandler = (event) => {
        setTitle(event.curretTarget.value);
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.curretTarget.value);
    }

    const priceChangeHandler = (event) => {
        setPrice(event.curretTarget.value);
    }

    const continentsChangeHandler = (event) => {
        setContinents(event.curretTarget.value);
    }


    return (
        <div class="uploadContainer">
            <div class ="subContainer">
            <h2>travel product upload</h2>
        </div>

        <Form>
            {/*Dronzone*/}
            <br/>
            <br/>
            <label>name</label>
            <Input onchange={titleChangeHandler} value={Title}/>

            <br/>
            <br/>

            <label>description</label>
            <TextArea onchange={descriptionChangeHandler} value={Description}/>

            <label>price($)</label>
            <Input onchange={priceChangeHandler} value={Price}/>

            <br/>
            <br/>

            <select onChange={continentsChangeHandler} value={Continents}>
                {/*

                2 different variation for same code 

                Error handling : Expected an assignment or function call and instead saw an expression
                    
                */}
                {/*Continents.map((item) => {
                  return (
                  <option key={item.key} value={item.value}>{item.value}</option>
                  )})*/}

                {ContinentsList.map((item) => (
                    <option key={item.key} value={Continents}>{item.value}</option>
                ))}

            </select>


            <br/>
            <br/>

            <Button>
                confirm
            </Button>

   
        </Form>
        </div>
    )
}

export default UploadProductPage
