const express = require('express');
const { postBlogController, getAllBlogs, updateBlog, likeBlog } = require('../controller/blog.controller');
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
router.route("/blog").post(upload.single("file"), postBlogController).get(getAllBlogs);
router.route("/blog/:id").put(updateBlog).patch(likeBlog);


module.exports = router