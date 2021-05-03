import React from 'react'
import {Carousel} from 'antd';

function ImageSlider(props) {
    return (
        <div>
        <Carousel autoplay>
           {props.imageList.map((image,index) => (
               <div key={index}>
                   <img className="productImage" src={`http://localhost:5000/${image}`}/>
               </div>
           ))}
        </Carousel>
        </div>
    )
}

export default ImageSlider
