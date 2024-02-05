import mongoose from "mongoose";

const Schema= mongoose.Schema()

const Order= new Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    quantity:{
        type:Number
    },
    unitPrice:{
        type:Number
    },
    totalPrice:{
        type:Number
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },


})

export default mongoose.model("Order", Order)