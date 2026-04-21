const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createPost } = require("../controllers/postController");

router.post("/",protect,createPost);

module.exports =router;