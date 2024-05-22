import mongoose, { Schema } from "mongoose";
import { Order } from "./Order.interface";

const orderSchema = new Schema<Order>({
    email: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product",
        required: true
        },
    quantity: {
        type: Number,
        required: true

    },
    price: {
        type: Number,
        required: true
    }
});

const OrderModel = mongoose.model("Order", orderSchema);


export default OrderModel;