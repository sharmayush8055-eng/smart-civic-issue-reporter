const userModel=require("../models/user.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

// register API
async function register(req,res){
    try{
    const{name,email,password,role="citizen"}=req.body;

    // If user not exits create user other gives error message
    const isUserAlreadyExists=await userModel.findOne
            ({email});

    if (isUserAlreadyExists){
        return res.status(400).json({message:"user already exists"});
    }

    // password hashing
    const hash=await bcrypt.hash(password,10);

    const user=await userModel.create({
        name,
        email,
        password:hash,
        role
    });

    // craete a token for paticular user
    const token=jwt.sign({
    id:user._id,
    role:user.role,
},
process.env.JWT_SECRET);

res.cookie("token",token);

res.status(201).json({
    message:"user registered successfully",
    user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
    }
});

}catch(err){
    res.status(500).json({message:err.message});
}
}

// Login API
async function login(req,res){
    try{
    const{name,email,password,role}=req.body;

    // user can login with email;
    const user=await userModel.findOne
        ({email});
    // if user not find
    if(!user){
        return res.status(401).json({message:"Invalid credentials"})
    }

    // bcrypt the password and compare with the password that store in server
    const ispasswordValid=await bcrypt.compare(password,user.password)

    if(!ispasswordValid){
        return res.status(401).json({message:"password invalid"})
    }

    const token=jwt.sign({
        id:user._id,
        role:user.role,
    },
    process.env.JWT_SECRET);

    res.cookie("token",token);

    res.status(200).json({
    message:"user login successfully",
    user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
    }
});
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
    
}
module.exports={register,login};