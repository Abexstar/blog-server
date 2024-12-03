const express = require('express');
const { postBlogController } = require('../controller/blog.controller');
const authentication = require('../middleware/auth.middleware');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'uploads/');
    // },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.use(authentication);
router.post("/blog", upload.single("file"), postBlogController);

module.exports = router