import { useState } from "react";
import Product from "./Product";

export const ProductList = () => {
  const [products, setProducts] = useState([
    { name: "Product 1", id: 1, availability: true, quantity: 1 },
    { name: "Product 2", id: 2, availability: false, quantity: 1 },
    { name: "Product 3", id: 3, availability: true, quantity: 5 },
    { name: "Product 4", id: 4, availability: false, quantity: 1 },
    { name: "Product 5", id: 5, availability: true, quantity: 4 },
    { name: "Product 6", id: 6, availability: true, quantity: 1 },
  ]);


  const handleProductAdd = (e) => { 
    if (e.key === "Enter") {
        const productName = e.target.value.trim();
        const newProduct = {
        name: productName,
        id: Math.random(),
        availability: true,
        quantity: 1,
      };
      setProducts((prevProducts) => [newProduct, ...prevProducts]);
      e.target.value = "";
    }
  };

  return (
    <div className="productListContainer">
      <h1>Product List</h1>

      <div className="productList">
        <input
          className="productInput"
          placeholder="Add Product"
          onKeyDown={handleProductAdd}
        />
        {products.map((item) => {
          return (
            item.availability && (
              <Product
                key={item.id}
                name={item.name}
                quantity={item.quantity}                
              />
            )
          );
        })}
      </div>
    </div>
  );
};
