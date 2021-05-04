import React, {useEffect,useState} from 'react';
import axios from 'axios';
import {Icon,Col,Card,Row} from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from "./Sections/CheckBox";
import {price,continents} from "./Sections/Data";
import  "./LandingPage.css"

function LandingPage() {
    
    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    // skip : from which index will data fetched ? , in this case start with 0 
    // every load more event will database load 8 data started from index 0 to 7
    // if skip is equal to 1 than load 8 data started with index 1 to 8
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => { 
        let body = {
            skip:Skip,
            limit:Limit,
        }
        getProduct(body)
    }, [])


    const getProduct = (body) =>  {
            axios.post('/api/product/products',body)
              .then(response => {
                  if(response.data.success) {
                      if(body.loadMore) {
                          setProducts([...Products,...response.data.productInfo])
                      } else {
                        setProducts(response.data.productInfo)
                      }
                      setPostSize(response.data.postSize)
                  }else {
                      alert('fail to load product')
                  }
              })
    }

    const loadMoreHandler = () => {
        let skip = Skip + Limit
        let body = {
            skip:skip,
            limit:Limit,
            loadMore:true
        }
       getProduct(body)
    }
    


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

        {/* Checkbox */}
        <CheckBox list={continents}/>

        {/* radiobox */}

        {/* Search */}
        {/* Cards */}

        <Row gutter={[16,16]}>
            {renderCards}
        </Row>

        <br/>

        {PostSize >=Limit && 
        <div className="buttonStyle">
            <button onClick={loadMoreHandler}>Load more</button>
        </div>}
    </div>
    )




     
    
}

export default LandingPage
