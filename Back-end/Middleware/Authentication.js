import jwt from "jsonwebtoken";
import  dotenv from "dotenv"
dotenv.config()
import bcrypt from "bcrypt"
import User from "../Models/User.js";


export const verifyToken= (req, res, next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({error: "Unauthorized"})
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next()
    } catch (error) {
        console.log(error.message)
        res.status(401).json(error.message)
    }
}

export const checkRole = (roles)=>{
    return (req,res, next)=>{
        try {
            if(roles.includes(req.user.role)){
                next();
            }else{
                return res.status(500).send("Access denied. you don't have permission")
            }
        } catch (error) {
            return res.status(404).json({error:404, message:"Not authorized"})
        }
    }
}

export const loggedInUser = (req, res) => {
    return res.json({ user: req.user }).status(200);
  };

  export const logOut = (req, res) => {
    return res
      .clearCookie("token")
      .status(200)
      .json({ message: "Successfully Logged Out!" });
  };
  