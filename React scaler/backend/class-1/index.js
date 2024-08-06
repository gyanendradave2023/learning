
const express = require("express");
const connectDB = require("./config/db");

const productRouter = require("./routes/productRoutes");
const app = express();

connectDB();
app.use(express.json()); // middleware for post request

//Routes Handling
app.use("/api/products", productRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running in port ${PORT}`);
});




