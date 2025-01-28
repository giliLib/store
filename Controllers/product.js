import { productModel } from "../Model/product_resource.js";

//שליפת כל המוצרים
export async function getAllProducts(req, res) {
    try {
        let getAll = await productModel.find();
        res.json(getAll)
    }
    catch (err) {
        res.status(400).json({
            title: "cannot get all product ",
            message: err.message
        })
    }
}
//שליפת מוצר לפי קוד-ID
export async function getProductById(req, res) {
    let { id } = req.params;
    try {
        let getProductbyId = await productModel.findById(id);
        if (!getProductbyId)
            return res.status(404).json({
                title: "cannot get product by id",
                message: "no product with such id"
            })
        res.json(getProductbyId)
    }
    catch (err) {
        res.status(400).json({
            title: "cannot get product by id",
            message: err.message
        })
    }
}
//הוספת מוצר 
export async function addProduct(req, res) {
    let { body } = req;
    if (!body.productName || !body.price || !body.dateOfManufacture) {
        return res.status(400).json({
            title: "Missing data in body",
            message: "productName, price, and dateOfManufacture are required"
        });
    }
    try {
        let alreadyProduct = await productModel.findOne({ productName: body.productName });
        if (alreadyProduct) {
            return res.status(409).json({
                title: "product already exists",
                message: "Change product name"
            });
        }
        let newProduct = new productModel(body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({
            title: "Cannot add new product",
            message: err.message
        });
    }
}

//עדכון מוצר
export async function updatProduct(req, res) {
    let { id } = req.params;
    let { body } = req;
    if (body.dateOfManufacture) {
        return res.status(400).json({
            title: "Invalid update request",
            message: "Cannot update dateOfManufacture here"
        });
    }
    try {
        console.log("Request Body:", body);
        let product = await productModel.findByIdAndUpdate(id, body, { new: true });
        if (!product) {
            return res.status(404).json({
                title: "Product not found",
                message: "No product found with such ID"
            });
        }
        res.json(product);
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({
            title: "Error updating product",
            message: err.message
        });
    }
}

// מחיקת מוצר לפי ID
export async function deleteProductById(req, res) {
    try {
      const { id } = req.params; 
      const deletedProduct = await productModel.findByIdAndDelete(id); 
  
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" }); 
      }
  
      res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
      res.status(500).json({ error: error.message }); 
    }
  };


