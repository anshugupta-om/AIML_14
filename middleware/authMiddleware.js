const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async(req,res,next)=> {
    try {
        let token = req.headers.authorization;
        if(!token || !token.startsWith("Bearer")){
            return res.status(401).json({
                success:false,
                message:"Not Authorized , token missing"
            });
        }
        token = token.split("")[1];
        const decoded =jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select('password');
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }
        req.user =user;
        next();
    }
    catch(e){
        res.status(500).json({
            success: false,
            message:"Auth Error",
            error: e.message
        });

    }
};

module.exports = protect;