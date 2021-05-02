const express = require('express');
const router = express.Router();
const multer  = require('multer');
const { Product } = require("../models/Product");



//=================================
//             User
//=================================


var storage = multer.diskStorage({
    // destination : saved location of files
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    }  
  })

var upload = multer({ storage: storage }).single("file");
   
router.post('/image', (req,res) => {
    // save loaded images
    upload(req,res,err => {
      if(err) {
        return req.json({success:false,err})
      }

      return res.json({success:true, filePath: res.req.file.path, fileName:res.req.file.filename});
    })

})


router.post('/', (req, res) => {

  // send received data into DB
  const product = new Product(req.body)

  product.save((err) => {
      if (err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ success: true })
  })

})




module.exports = router;
