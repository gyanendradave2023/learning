
const mongoose = require('mongoose');
const express = require('express');

const connectDB = require("./config/db");
const app = express();

const productRouter = require("./routes/productRoutes");

connectDB();
app.use(express.json()); // middleware for post request

//Routes Handling
app.use("/api/products", productRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running in port ${PORT}`);
});




const ProductModel = mongoose.model("products", productSchema);


const port = 3000;

app.listen(port, () => {
    console.log("Server Started");
});


app.post('/api/products', async (req, res) => {
    const body = req.body;
    const product = await ProductModel.create({
        product_name: body.product_name,
        product_price: body.product_price,
        product_qty: body.product_qty,
        isInStock: body.isInStock,
        category: body.category,
    });

    console.log(product);
    return res.status(201).json({message: 'Product created', product: product});
});


app.get('/api/products', async (req, res) => {
    const allProducts = await ProductModel.find();
    console.log(allProducts);
    return res.status(200).json({message: 'All Products', product: allProducts});
})

app.get('/api/products/:id', async (req, res) => {
    const id = req.params.id;
    const product = await ProductModel.findById(id)
    console.log(product);
    return res.status(200).json({message: 'Find Product', product:product});
})
