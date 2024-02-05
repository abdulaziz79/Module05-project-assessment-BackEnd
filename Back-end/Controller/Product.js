import Product from "../Models/Product.js";

export const readAllProduct=async(req,res)=>{
    try {
        const product= await Product.find()
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json(error.message);

    }
}

 export const createProduct= async(req,res)=>{
    const {title, price, description}= req.body
    try {
        const newProduct = new Product({
                title,
                description,
                image:req.file.path,
                price,
        })
        if(!title){
            return res.status(400).json("title is required")
        }
        if(!description){
            return res.status(400).json("description is required")
        }
        if(!price){
            return res.status(400).json("price is required")
        }
        const neww= await newProduct.save()
        res.status(200).json(neww)
    } catch (error) {
        return res.status(500).json( {message:error.message});

    }
}
export const deleteProduct= async (req, res) => {
    const { id } = req.params
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
         return   res.status(404).json({ error: 'Product not found' })
        }
       return res.status(200).json({ message: "Product Deleted" })
    }
    catch (error) {
      return  res.status(404).json(error.message)
    }
}