const express = require('express');
const router = express.Router();
const multer  = require('multer');

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
    upload((req,res,err) => {
        if(err) {
            return res.json({success:false, err});
        } else {
            return res.json({success:true, filePath:res.req.file.path,fileName:res.req.file.filename});
        }
    })

})

module.exports = router;
