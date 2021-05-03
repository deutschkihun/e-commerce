import React, {useEffect,useState} from 'react';
import axios from 'axios';
import {Icon,Col,Card,Row,Carousel} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import  "./LandingPage.css"

function LandingPage() {
    
    const [Products, setProducts] = useState([])


    useEffect(() => {
      axios.post('/api/product/products')
        .then(response => {
            if(response.data.success) {
                setProducts(response.data.response)
            }else {
                alert('fail to load product')
            }
        })
    }, [])


    const renderCards = Products.map((product,index) => {
        return (
            <Col lg={6} md={8} xs={24} key={index} >
            <Card
                cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a>}>
                <Meta
                    title={product.title}
                    description={`$${product.price}`}
                />
            </Card>
            </Col>
        )
    })

    return ( 
        <div className="cardContainer">
        <div className="cardTitle">
            <h2>Let's Travel Anywhere <Icon type="rocket"/></h2>
        </div>


        {/* Filter */}
        {/* Search */}
        {/* Cards */}

        <Row gutter={[16,16]}>
            {renderCards}
        </Row>

    </div>
    )




     
    
}

export default LandingPage
