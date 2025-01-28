import { Schema, model, Types } from "mongoose";
import { productModel } from "./product_resource.js"; 

//סכימה למוצר מינימלי 
const minimalProductSchema = new Schema({
    _id: { type: Types.ObjectId, required: true },
    productName: String,
});

// סכימה להזמנה
const orderSchema = new Schema({
    orderDate: { type: Date, default: Date.now },
    targetDate: Date,
    deliveryAddress: String,
    clientCode: { type: Types.ObjectId },
    products: { type: [minimalProductSchema] }, // או להשתמש ב-productSchema המלא
    isShipped: { type: Boolean, default: false },
    shippingPrice: Number,
    finalPrice: Number,
});

export const orderModel = model("order", orderSchema);
