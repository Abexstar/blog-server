const cloudinary = require("../config/cloudinary");
const Post = require("../model/post.model");
const User = require("../model/user.model");

const postBlogController = async (req, res) => {
    try {
        const { id, email } = req.user;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized user'
            });
        }
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({
                status: 'error',
                message: 'Content is required'
            });
        }

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path).catch(flyerErr => {
                console.error('Error uploading flyer:', flyerErr);
                return res.status(500).json({ error: 'Error uploading flyer', success: false, errLog: flyerErr });
            });
            // blogData.image = result.secure_url;
            const createPost = new Post({
                content,
                image: result.secure_url,
                author: user
            });

            await createPost.save();

            res.status(201).json({
                status:'success',
                message: 'Blog posted successfully',
                post: createPost
            });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
        status: 'error',
        message: error.message || "server error"
        });
    }
}

module.exports = {
    postBlogController
}