import {Schema,model}from "mongoose";

const userSchema = new Schema({
    email: String,
    userName: String,
    password: String,
    role: { type: String, default: "USER" }, 
    registrationDate: { type: Date, default: Date.now }, // ברירת מחדל לתאריך נוכחי
});

export const userModel=model("user",userSchema);