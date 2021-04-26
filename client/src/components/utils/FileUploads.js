import React from 'react'
import Dropzone from "react-dropzone";
import {Icon} from "antd";
import "./FileUpload.css"

function FileUploads() {
    return (
        <div className="dropzoneContainer">
          <Dropzone onDrop={acceptedFiles => console.log("acceptedFiles",acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <div className="dropfield"
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" className="dropIcon"/>
                    </div>
                )}
            </Dropzone>
        </div>
    )
}

export default FileUploads
