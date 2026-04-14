const express = require("express");
const User =require("../models/User");
const bcrypt =require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerUser } = require("../controllers/authController");
const router = express.Router();

router.post("/register", registerUser)

module.exports =router;