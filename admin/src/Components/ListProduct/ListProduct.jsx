import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/allproducts`);
      const data = await response.json();
      setAllProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/removeproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`Removed ${data.name} successfully`);
        fetchProducts();
      } else {
        alert("Failed to remove product");
      }
    } catch (err) {
      console.error("Remove product error:", err);
    }
  };

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Image</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img
                src={product.image}
                alt={product.name}
                className="listproduct-product-icon"
              />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img
                src={cross_icon}
                alt="Remove"
                className="listproduct-remove-icon"
                onClick={() => removeProduct(product.id)}
              />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
