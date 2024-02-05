import User from "../Models/User.js";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken";

export const register=async(req,res)=>{
    const {name, email, password, role}= req.body;
    try {
        if(!password || password.trim().length<6) {
            return res.status(400).json({error:"invalid password"})
        }
        const existingUSer= await User.findOne({email});
        if(existingUSer){
            return res.status(400).json("Email already exists")
        }
        const hashedPassword= await bcrypt.hash(password, 10)
        const newUSer= new User({
            name,
            email,
            role: role || "user",
            password: hashedPassword
        })
        await newUSer.save()
        const isSecure= process.env.NODE_ENV === "production"

    } catch (error) {
        res.status(404).json(error.message)
    }
}

export const login=async(req,res)=>{
    const {email, password}= req.body;
    try {
        if(!email || !password){
            return res.status(400).json("all fields are required")
        }
        const user= await User.findOne({email})
        if(!user){
            return res.status(401).json("Invalid Email")
        }
        const isValidPassword= await bcrypt.compare(password, user.password)
        if(!isValidPassword){
            return res.status(401).json("your Password is incorrect")

        }
        const token= jwt.sign(
            {
                _id: user._id, role: user.role, email, name:user.name
            },
           "qwertyuip",
            {expiresIn:"24h"}
        )
        return res.cookie("token", token, {
            httpOnly:true,
            secure:true,
            sameSite:"None"
        }).status(200).json({ message: "Login successful", data: user , token});

    } catch (error) {
                res.status(500).json(error.message)

    }
}

export const getAllUsers= async (req, res) => {
    try {
      const allUsers = await User.find();
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}