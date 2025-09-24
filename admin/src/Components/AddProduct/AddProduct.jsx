import React, { useState } from "react";
import "./AddProduct.css";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    old_price: "",
    new_price: "",
    category: "women",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    try {
      // 1. Upload image
      const formData = new FormData();
      formData.append("product", image);

      const uploadResponse = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadData.success) {
        alert("Image upload failed");
        return;
      }

      // 2. Save product
      const newProduct = {
        ...productDetails,
        image: uploadData.image_url,
      };

      const response = await fetch(`${API_BASE_URL}/addproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      if (data.success) {
        alert("Product added successfully!");
        setProductDetails({
          name: "",
          old_price: "",
          new_price: "",
          category: "women",
        });
        setImage(null);
      } else {
        alert("Failed to add product");
      }
    } catch (err) {
      console.error("Add product error:", err);
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          name="name"
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Old Price</p>
          <input
            name="old_price"
            value={productDetails.old_price}
            onChange={changeHandler}
            type="number"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>New Price</p>
          <input
            name="new_price"
            value={productDetails.new_price}
            onChange={changeHandler}
            type="number"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Category</p>
        <select
          name="category"
          value={productDetails.category}
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Image</p>
        <input type="file" name="image" onChange={imageHandler} />
      </div>
      <button onClick={addProduct} className="addproduct-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
