import  express, { request }  from "express";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
// import "dotenv/config"
import cors from "cors"
import { connectDB } from "./config/Config.js";
import dotenv from "dotenv"
import userRoutes from "./Routes/User.js";
import productRoute from "./Routes/Product.js";
import OrderRoute from "./Routes/Order.js";
// import Order from "./Models/Order.js";rs
dotenv.config()


const app=express()
app.use(express.json());

const corsOption={
    origin:"http://localhost:3000",
    credentials:true,
    optionsSuccessStatus:200
}

app.use(cors(corsOption))
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser())

const PORT= process.env.PORT;

app.listen(PORT, (error)=>{
    if(!error) {
        console.log("Server is Running, and App is listening on port "+ PORT) 
    } else {
        console.log("Error: ", error)
    }
})
connectDB()

app.use("/user" , userRoutes)
app.use("/order",OrderRoute)
app.use("/product", productRoute)