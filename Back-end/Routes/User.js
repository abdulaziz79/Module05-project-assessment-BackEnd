import  express  from "express";
import { register, login, getAllUsers } from "../Controller/User.js";
import { verifyToken, checkRole} from "../Middleware/Authentication.js";

const userRoutes=express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login",login)
userRoutes.get("/readAll",checkRole(["admin"]),getAllUsers)

export default userRoutes