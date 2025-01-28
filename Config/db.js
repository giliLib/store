import {connect}from "mongoose";

export const connectToDb=async(req,res)=>{
    try{
        let con=await connect(process.env.DB_URL||5500)
        console.log("mongo db connected")
    }
    catch(err){
        console.log("cannot connect mongoDb",err)
        process.exit(1)
    }
}