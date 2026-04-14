const User =require ("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser =async(req,res)=> { 
    try{
       const{ name, email, password}= req.body;
       if (!name || !email || !password){
          return res.status(400).json({
            success:false,
            message: "All fields are required"
          });
       }
       const existingUser = await User.findOne({email});
       if(existingUser){
        return res.status(400).json({
            success:false,
            message: "User Aleady Exists"
        });
       }

       const hashedPassword =await bcrypt.hash(password,10);   //10 represent the status of strongness

       const user = await User.create({
        name,
        email,
        password: hashedPassword
       });
       res.status(201).json({
        success:true,
        message:"User Registered Successfully",
        data: user
       });
    }
    catch(e){
        console.log("ERROR DETAIL: ",e);
        res.status(500).json({
            success:false,
            message: "Unable to Register",
            error: e.message
        });

    }
};

const loginUser = async(req,res)=>{
    try{
        const {email,password} =req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message: "Email and password required"
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message: "Invalid "
            });
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch){
            return res.status(404).json({
                success: false,
                message:" Invalid Password"
            });
        }
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        );
        res.status(200).json({
            success:true,
            message:"Login Success",
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }

        });
    }
    catch(e){
        res.status(500).json({
            success:false,
            message:"Unable to login",
            error: e.message
        })
         
    }
};

module.exports ={ registerUser, loginUser};