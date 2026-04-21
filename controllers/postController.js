const Post = require("../models/Post");
const POst = require("../models/Post");

const createPost = async (req,res)=>{
    try{
        const { title, content }= req.body;
        if(!title || !content){
            return res.status(401).json({
                success:false,
                message: "Title & Content Required"
            });
            }
            const post = await Post.create({
                title, content, user: req.user._id
            });
            res.status(201).json({
                success:true,
                message: "Post Created Successfully",
                post
            });
    }
    catch(e){
        res.status(500).json({
            success: false,
            message: "Unable to POST",
            error: e.message
        });
    }
};

const getAllPosts = async (req,res)=>{
    try{
        const posts = await Post.find().populate("user", "name email");
        res.status(200).json({
            success:true,
            message: "All Posts",
            count: posts.length,
            posts
        });
    }
    catch(e){
        res.status(500).json({
            success: false,
            message: "Unable to get posts",
            error: e.message
        });

    }
};

const getSinglePost = async (req,res)=>{};

const updatePost = async (req,res)=>{};

const deletePost = async (req,res)=>{};

module.exports ={ createPost};

