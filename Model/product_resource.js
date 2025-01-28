import { Schema, model } from "mongoose";

// הגדרת הסכמה עם Mongoose
const productSchema = new Schema({
    productName: String,
    description: String,
    dateOfManufacture: Date,
    RoutingToImage: String,
    price: Number,
    categories: [String],
    specifications: {
        color: String,
        size: String,
        weight: Number,
    },
});

// יצירת מודל
export const productModel = model("product", productSchema);
