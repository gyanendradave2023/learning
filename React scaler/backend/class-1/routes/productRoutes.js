const express = require("express");
const productRouter = express.Router(); 

const {
    createProduct,
    getAllProduct,
    getProductById,
    updateProductById,    
    deleteProductById,
} = require("../controllers/productController");

// POST method route
productRouter.post("/", createProduct);

// Get all product
productRouter.get("/",  getAllProduct);

//Finding a Product by ID:
productRouter.get("/:id", getProductById);

//Update a product in the DB (put method)
productRouter.put("/:id", updateProductById);

//Delete a product in the DB
productRouter.delete("/:id", deleteProductById);


module.exports = productRouter;