import  express  from "express";
import { createOrder,getAllOrders } from "../Controller/Order.js";

const OrderRoute= express.Router()

OrderRoute.post("create",createOrder),
OrderRoute.get("read",getAllOrders)

export default OrderRoute