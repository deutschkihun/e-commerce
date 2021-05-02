
import React, {useState} from 'react'
import Dropzone from "react-dropzone";
import {Icon} from "antd";
import "./FileUpload.css"
import axios from 'axios';

function FileUploads(props) {

    const [Images, setImages] = useState([]);
    const dropHandler = (files) => {

        let formData = new FormData();
        const config = {
            header: {'content-type' : 'multipart/form-data'}
        }
        formData.append("file",files[0]);

        axios.post('/api/product/image',formData,config)
            .then(response => {
                if(response.data.success) {
                    setImages([...Images,response.data.filePath]);
                    //transport to parent component (UploadProudctPage)
                    props.refreshFunction([...Images,response.data.filePath]) 

                }else {
                    alert('fail to save')
                }
            })
    }

    const deleteHandler = (image) => {
        const currentImage = Images.indexOf(image);
        let newImages = [...Images];
        newImages.splice(currentImage,1);
        setImages(newImages);
        //transport to parent component (UploadProudctPage)
        props.refreshFunction(newImages) 
    }

    return (
        <div className="dropzoneContainer">
            {/* opDrop = {acceptedFiles => console.log("acceptedFiles",acceptedFiles)} */}
          <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <div className="dropfield"
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" className="dropIcon"/>
                    </div>
                )}
            </Dropzone>

            <div className="imageDisplayContainer">
                    {Images.map((image,index) => (
                        <div key={index} onClick={() => deleteHandler(image)}>
                            <img className="imageDisplay"
                                src={`http://localhost:5000/${image}`}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default FileUploads
