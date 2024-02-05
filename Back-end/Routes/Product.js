import express from "express"
import uploadImage from "../Middleware/Multer.js"
import { deleteProduct, readAllProduct, createProduct } from "../Controller/Product.js"

const productRoute= express.Router()

productRoute.post("/create",uploadImage.single("image"),createProduct)
productRoute.get("/readAll",readAllProduct)
productRoute.delete("delete/:id",deleteProduct)

export default productRoute