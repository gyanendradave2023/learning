
const mongoose = require('mongoose');

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

const productModel = mongoose.model("products", productSchema);
