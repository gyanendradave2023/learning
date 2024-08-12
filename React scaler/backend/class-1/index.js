
const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json());

const dbUrl = `mongodb+srv://gyanendradave2023:ZjQStut5cdMdfJmx@cluster0.sjipppy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbUrl)
.then((connection) => {  
    console.log('Connected to db');
}).catch((error) => {
    console.log('Connection error:', error.message);
}); 


const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        require:true
    },
    product_price: {
        type: Number,
        require:true
    },
    product_qty: {
        type: Number,
        require:true
    },
    isInStock: {
        type: Boolean,
        default:true
    },
    category: {
        type: String,
        require:true
    },
}, 
{timestamps:true}
);

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