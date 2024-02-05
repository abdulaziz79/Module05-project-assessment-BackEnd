import Order from "../Models/Order.js";

export const createOrder=async (req,res)=>{
    const { productID, title, description, quantity, unitPrice, totalPrice, userId}=req.body
        try {
            const newOrder = await Order.create({
                productID,
                title,
                description,
                quantity,
                unitPrice,
                totalPrice,
                userId,
           
            })
            await newOrder.save()
            return res.status(200).json({ message: 'Your Order has been created successfuly!', Order: newOrder })

    } catch (error) {
        return res.status(404).json({ message: error.message })

    }
}
 export const getAllOrders= async (req, res) => {
    try {
        const orders = await Order.find()
        return res.status(200).json({ Orders: orders })
    }
    catch (error) {
        return res.status(404).json({ status: 404, error: error })
    }
}
export const getOrdersByUser= async (req, res) => {
    const userId = req.body.userId
    try {
        const orders = await Order.find({ userId: userId })
        orders ? res.status(200).json({ Orders: orders }) :
            res.status(404).send(`Invalid UserID ${userId}!`)
    }
    catch (error) {
        return res.status(404).json({ status: 404, error: error })
    }
}