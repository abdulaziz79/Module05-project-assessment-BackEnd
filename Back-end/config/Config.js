import mongoose from "mongoose";

const DB_URL= process.env.DB_URL

export const connectDB=()=>{
    mongoose.connect("mongodb+srv://aboudecharkawi:9K1DDX4nedVqGzFO@cluster0.56dsnqm.mongodb.net/")
    .then(()=>{
        console.log('Database connected')
    }).catch((error)=>{
        console.log(error)
    })
}