const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require("../models/Product");
//=================================
//             Product
//=================================


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

    //가져온 이미지를 저장을 해주면 된다.
    upload(req, res, err => {
        if (err) {
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

})




router.post('/', (req, res) => {

    //loaded information send to DB
    const product = new Product(req.body)

    product.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

})

router.post('/products', (req, res) => {

    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm 
    let findArgs = {};

    for(let key in req.body.filters) {
        // key should be "continent or price"
        if(req.body.filters[key].length > 0) {

            if(key === "continents") {
                findArgs[key] = req.body.filters[key];
            } else {
                findArgs[key] = {
                    $gte : req.body.filters[key][0], // gte = greater than equal
                    $lte : req.body.filters[key][1]  // lte = less than equal

                    /**
                     *   {
                        "_id": 3,
                        "name": "$250 to $279",
                        "array": [250, 279]
                        },
                        250 is gte and 279 is lte 
                     */
                }
            }
        } 
    }
    // get all data from collection (table)
    // populate : (데이터를) 덧붙이다.
    // exec : execute querying  
    // documentation : https://mongoosejs.com/docs/populate.html
    // documentation: https://docs.mongodb.com/manual/reference/operator/query/text/
    if (term) {
        Product.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, productInfo,
                    postSize: productInfo.length
                })
            })
    } else {
        Product.find(findArgs)
            .populate("writer")
            .skip(skip)
            .limit(limit)
            .exec((err, productInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, productInfo,
                    postSize: productInfo.length
                })
            })
    }
})

// id = 111,222,333 ... => type is array
// id = 111 => type is single 
router.get('/products_by_id', (req, res) => {
    // use productId get product information from database
    // API url request has qurey setting with id=${productId}&type=single
    // then by using req.query can get a id and type 
    let type = req.query.type
    let productIds = req.query.id

    if(type === "array") {
        // // from...  id = 111,222,333 
        // to ... productIds = [111,222,333] 
        let ids = req.query.id.split(',')
        productIds = ids.map(item =>{
            return item
        })
    }

    Product.find({_id: {$in: productIds} })
        .populate('writer')
        .exec((err,product) => {
            if(err) return res.status(200).send(err)
            //return res.status(200).json({success: true, product}) old version
            return res.status(200).send(product)
        })

})


module.exports = router;
