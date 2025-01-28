import express from 'express';
import dotenv from 'dotenv'; 
import cors from  "cors";


import userRouter from "./Routers/user.js"
import productRouter from "./Routers/product.js"
import orderRouter from "./Routers/order.js"
import { connectToDb } from './Config/db.js';


dotenv.config();
// חיבור למסד הנתונים
connectToDb();
const app = express();
app.use(cors({ origin: "http://localhost:5500" }));
app.use(express.json())
 

app.use("/api/user",userRouter);
app.use("/api/product",productRouter);
app.use("/api/order",orderRouter);

const port = process.env.PORT 
// הפעלת השרת
app.listen(port,"localhost",()=>{
    console.log("app is listening on port"+port)
})


