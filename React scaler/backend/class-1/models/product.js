const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
      product_name: {
        type: String,
        require: true,
      },
      product_price: {
        type: Number,
        require: true,
      },
      product_qty: {
        type: Number,
        require: true,
      },
      isInStock: {
        type: Boolean,
        default: true,
      },
      category: {
        type: [String],
        require: true,
      },
      password: {
        type: String,
        required: true,
        minLength: 8,
      },
      confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
          validator: function () {
            return this.password === this.confirmPassword;
          },
          message: "Password and confirm password should be same",
        },
      },
    },
    { timestamps: true }
  );

  productSchema.pre("save", function(){
    console.log("1 Inside pre hook");
    this.confirmPassword = undefined;
  });

   
  productSchema.pre("save", function(next){
    console.log("Inside validation hook hook");
    const invalidCategories = this.category.filter((category) => {
        return !validCategories.includes (category);
    });
    console.log("invaild", invalidCategories);

    if(invalidCategories.length) {
        next(new Error(`Invalid categories ${invalidCategories.join(",")}`));
    } else {
        next();
    }
  });
  
  const ProductModel = mongoose.model("products", productSchema);

  module.exports = ProductModel;