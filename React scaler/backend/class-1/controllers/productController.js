const ProductModel = require("../models/product");

const getAllProduct = async (req, res) => {
  const allProducts = await ProductModel.find({});
  // const allProducts = await ProductModel.find({isInStock :true})
  console.log(allProducts);
  return res.status(200).json(allProducts);
};

const createProduct = async (req, res) => {
  const body = req.body;
  try {
    console.log("2 Creating product");
    const product = await ProductModel.create({
      product_name: body.product_name,
      product_price: body.product_price,
      product_qty: body.product_qty,
      isInStock: body.isInStock,
      category: body.category,
      password: body.password,
      confirmPassword: body.confirmPassword,
    });
    console.log('3 Product created', product);
    return res.status(201).json({ message: "Product Created" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Something went wrong", err });
  }
};

const getProductById = async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);
  return res.status(200).json({ message: "Producr Found", product: product });
};

const updateProductById = async (req, res) => {
  await ProductModel.findByIdAndUpdate(req.params.id, req.body);
  return res.status(201).json({ message: "Product Updated" });
};

const deleteProductById = async (req, res) => {
  const id = req.params.id;
  await ProductModel.findByIdAndDelete(id);
  return res.status(200).json({ message: "Product Deleted" });
};


module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
