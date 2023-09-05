import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import axios from "axios";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const { id: productId } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    console.log("add to cart button clicked");
    dispatch(addToCart({...product, qty}))

  };

  useEffect(() => {
    axios
      .get(`/api/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setError(error); // Set error if there's an issue
        setLoading(false); // Set loading to false when there's an error
      });
  }, [productId]);

  return (
    <Container className="p-4 mx-auto">
      <Link to={"/"} className="text-gray-600 hover:text-gray-800 mb-4">
        Back to Products
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">
          Error fetching products: {error.message}
        </Message>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center py-8 max-w-screen-xl mx-auto">
          <div className="pr-0 md:pr-8 mb-6 md:mb-0 h-[300px] w-[300px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full md:w-96 h-auto mx-auto rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
            <p className="text-gray-600 text-xl font-semibold mb-4">
              ${product.price}
            </p>
            <div className="mb-4">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </div>
          
            <div className="flex items-center justify-evenly mb-6">
              {/* {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'} */}
              <p
                className={`text-lg font-semibold mr-4 ${
                  product.countInStock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
              </p>
              {/* {product.countInStock > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-600">Qty</label>
                  <div>
                    <select
                      className="px-3 py-2 border rounded-md w-20"
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )} */}
              {product.countInStock > 0 && (
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white py-3 px-6 rounded-full"
                  disabled={product.countInStock === 0}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              )}
            </div>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-full">
              Add to Wishlist
            </button>
              <p className="text-lg mb-8">{product.description}</p>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProductDetail;
