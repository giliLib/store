import { orderModel } from "../Model/order_resource.js";

//שליפת כל ההזמנות
export async function getAllOrder(req, res) {
    try {
        let getAll = await orderModel.find();
        res.json(getAll)
    }
    catch (err) {
        res.status(400).json({
            title: "cannot get all orders ",
            message: err.message
        })
    }
}

//הוספת הזמנה 
export async function addOrder(req, res) {
    let { body } = req;
    if (!body.clientCode || !body.targetDate||!body.products) {
        return res.status(400).json({
            title: "Missing data in body",
            message: "clientCode and targetDate are required"
        });
    }
    try {
        console.log("Request Body:", body);
        console.log("Checking for duplicate order...");
        let duplicateOrder = await orderModel.findOne({
            clientCode: body.clientCode,
            targetDate: body.targetDate,
            "products._id": { $in: body.products.map(p => p._id) } 
        });
        console.log("Duplicate Order Result:", duplicateOrder);
    
        if (duplicateOrder) {
            return res.status(409).json({ 
                title: "Duplicate order",
                message: "An order with the same clientCode, targetDate, and products already exists"
            });
        }
    
        console.log("Saving new order...");
        let newOrder = new orderModel(body);
        await newOrder.save();
        console.log("Order saved successfully:", newOrder);
        res.status(201).json(newOrder);
    } catch (err) {
        console.error("Error saving order:", err);
        res.status(500).json({
            title: "Cannot add new order",
            message: err.message
        });
    }
}
//מחיקת הזמנה
export async function deleteOrderById(req, res) {
    
      const { id,isShipped } = req.params; 
      if(isShipped==true)
        return res.status(404).json({ error: "order isShipped " });
      try {
      const deletedOrder = await orderModel.findByIdAndDelete(id); 
  
      if (!deletedOrder) {
        return res.status(404).json({ error: "order not found" }); 
      }
  
      res.status(200).json({ message: "Product deleted successfully", deletedOrder });
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  };
  //שליפת כל המוצרים של קליינט מסויים
  export async function getAllOrderByClientCode(req, res) {
    const { clientCode } = req.params;

    // בדיקת תקינות של clientCode
    if (!clientCode || !Types.ObjectId.isValid(clientCode)) {
        return res.status(400).json({
            title: "שגיאה בקלט",
            message: "נדרש clientCode חוקי",
        });
    }

    try {
        // חיפוש ההזמנות במסד הנתונים לפי clientCode
        const orders = await orderModel.find({ clientCode });

        // אם לא נמצאו הזמנות עבור ה-clientCode
        if (!orders.length) {
            return res.status(404).json({
                title: "לא נמצאו הזמנות",
                message: "לא נמצאו הזמנות עבור clientCode שסופק",
            });
        }

        // החזרת התשובה עם כל ההזמנות
        res.json({
            title: "ההזמנות נמצאו",
            count: orders.length,
            orders,
        });
    } catch (err) {
        // טיפול בשגיאה אם יש בעיה בבסיס הנתונים
        res.status(500).json({
            title: "שגיאת בסיס נתונים",
            message: err.message,
        });
    }
}
// פונקציה לעדכון הזמנה ל"יצאה לדרך"
export async function updatOrder(req, res) {
    const { id } = req.params;
    if (!id || !Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            title: "שגיאה בקלט",
            message: "נדרש קוד הזמנה חוקי",
        });
    }

    try {
        
        const updatedOrder = await orderModel.findByIdAndUpdate(
            orderId, 
            { isShipped: true }, // ערך העדכון
            { new: true } // אופציה שתחזיר את ההזמנה המעודכנת
        );

        // אם לא נמצאה ההזמנה
        if (!updatedOrder) {
            return res.status(404).json({
                title: "הזמנה לא נמצאה",
                message: "לא נמצאה הזמנה עם קוד ההזמנה שסופק",
            });
        }

        // החזרת ההזמנה המעודכנת
        res.json({
            title: "הזמנה עודכנה בהצלחה",
            order: updatedOrder,
        });
    } catch (err) {
        res.status(500).json({
            title: "שגיאת בסיס נתונים",
            message: err.message,
        });
    }
}
