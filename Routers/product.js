import{Router} from "express";

import{getAllProducts,getProductById,addProduct,updatProduct,deleteProductById}from "../Controllers/product.js"

const router=Router();
router.get("/",getAllProducts);
router.get("/:id",getProductById);
router.post("/",addProduct);
router.put("/:id",updatProduct);
router.delete("/:id",deleteProductById);


export default router;
