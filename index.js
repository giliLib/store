import express from 'express';
import dotenv from 'dotenv'; 
import cors from "cors";

import userRouter from "./Routers/user.js";
import productRouter from "./Routers/product.js";
import orderRouter from "./Routers/order.js";
import { connectToDb } from './Config/db.js';

dotenv.config();
// חיבור למסד הנתונים
connectToDb();

const app = express();

// הגדרת CORS
app.use(cors({ origin: "http://localhost:5500" }));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);

// הגדרת הפורט
const port = process.env.PORT || 5500;

// הפעלת השרת עם כתובת '0.0.0.0' כדי ש־Render יוכל לגשת
app.listen(port, "0.0.0.0", () => {
    console.log(`App is listening on port ${port}`);
});
