import{Router} from "express";

import{getAllOrder,addOrder,deleteOrderById,getAllOrderByClientCode,updatOrder}from "../Controllers/order.js"

const router=Router();
router.get("/",getAllOrder);
router.post("/",addOrder);
router.delete("/:id",deleteOrderById);
router.get("/clientCode/:clientCode", getAllOrderByClientCode);
router.put("/:id",updatOrder);


export default router;
