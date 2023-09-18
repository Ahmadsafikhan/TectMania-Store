import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Container from "../../components/common/Container";
import { toast } from "react-toastify";
// import Paginate from '../../components/Paginate';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/products"); // Adjust the URL as needed
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
   

    fetchProducts();
  }, []);

 const createProductHandler = async() =>{
  if (window.confirm('Are you sure you want to create a new product?')) {
    try {
      // You can define your product data here as needed
      // const newProductData = {
      //   // Define your product properties here
      //   name: 'New Product',
      //   price: 0,
      //   category: 'Uncategorized',
      //   brand: 'New Brand',
      // };

      // Send a POST request to create the product
      const response = await axios.post('/api/products');

      // Check if the request was successful
      if (response.status === 201) {
        // Product creation was successful
        toast.success('Product created successfully.');
        // Fetch the updated product list
        fetchProducts();
      } else {
        // Handle other response statuses (e.g., validation errors) here
        toast.error('Product creation failed. Please check your input.');
      }
    } catch (err) {
      // Handle errors here
      console.error('Error creating product:', err);
      toast.error('An error occurred while creating the product.');
    }
  }
 }

  return (
    <>
    <Container className="mx-auto p-4">
      {" "}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300" onClick={createProductHandler}>
          <FaPlus className="mr-2" /> Create Product
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error.data.message}</Message>
      ) : (
        <>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-100 text-left">ID</th>
                <th className="px-4 py-2 bg-gray-100  text-left">NAME</th>
                <th className="px-4 py-2 bg-gray-100  text-left">PRICE</th>
                <th className="px-4 py-2 bg-gray-100  text-left">CATEGORY</th>
                <th className="px-4 py-2 bg-gray-100  text-left">BRAND</th>
                <th className="px-4 py-2 bg-gray-100  text-left"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-4 py-2">{product._id}</td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">{product.brand}</td>
                  <td className="px-4 py-2">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button className="text-blue-500 hover:underline mr-2" >
                        <FaEdit />
                      </button>
                    </Link>
                    <button className="text-red-500 hover:underline">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <Paginate pages={data.pages} page={data.page} isAdmin={true} /> */}
        </>
      )}
      </Container>
    </>
  );
};

export default ProductList;
