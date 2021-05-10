import axios from 'axios'
import React,{useEffect,useState} from 'react'
import ProductImage from "./ProductImage"
import ProductInfo from "./ProductInfo"
import {Row,Col} from "antd"
import "./DetailProductPage.css"

function DetailProductPage(props) {

    /*
     * about props.match.params.productId
     * The library passes in a prop called match into every route that is rendered. 
     * Inside this match object is another object called params. 
     * This holds all matching params where the key is the name we specified 
     * when creating the route and the value is the actual value in the URL
     */

    const productId = props.match.params.productId
    const [Product, setProduct] = useState({})

    useEffect(() => {
      
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data.product[0])
            })
            .catch(err => alert(err))

    }, [])

    return (
        <div className="detailProductContainer">
            <div className="detailProductTitle">
                <h1>{Product.title}</h1>
            </div>

            <br/>

             <Row gutter={[16, 16]} >
                <Col lg={12} sm={24}>
                    {/* ProductImage */}
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* ProductInfo */}
                    <ProductInfo detail={Product} />
                </Col>
            </Row>
        </div>
    )
}

export default DetailProductPage
