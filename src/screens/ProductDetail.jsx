import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Container from "../components/common/Container";
import axios from "axios";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    console.log("add to cart button clicked");
    dispatch(addToCart({ ...product, qty }));
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

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/api/products/${productId}/reviews`, {
        rating,
        comment,
      });
  
      // Refetch product details
      const response = await axios.get(`/api/products/${productId}`);
      setProduct(response.data);
  
      toast.success("Review created successfully");
    } catch (err) {
      console.log("Error has been occurred i while reviewing the product")
      if (err.response && err.response.data.message === "Product already reviewed") {
        toast.error("You have already reviewed this product");
      } else {
        toast.error(err.message || "Failed to create review");
      }
    }
  };

  return (
    <>
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
          <>
            <div className="flex flex-col md:flex-row justify-center items-center py-8 max-w-screen-xl mx-auto">
              <div className="pr-0 md:pr-8 mb-6 md:mb-0 md:w-[300px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto mx-auto rounded-lg"
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
                  <p
                    className={`text-lg font-semibold mr-4 ${
                      product.countInStock > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </p>

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

            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-semibold">Reviews</h2>
              {product.reviews.length === 0 ? (
                <Message>No Reviews</Message>
              ) : (
                <div className="space-y-4 mt-4">
                  {product.reviews.map((review) => (
                    <div key={review._id} className="border p-4 rounded-md">
                      <div className="font-semibold">{review.name}</div>
                      <Rating value={review.rating} />
                      <div className="text-gray-500">
                        {review.createdAt.substring(0, 10)}
                      </div>
                      <div className="mt-2">{review.comment}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4">
                <h2 className="text-2xl font-semibold">
                  Write a Customer Review
                </h2>

                {loading && <Loader />}

                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="mt-2">
                      <label htmlFor="rating" className="block">
                        Rating
                      </label>
                      <select
                        id="rating"
                        required
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="border p-2 rounded-md w-full"
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <div className="mt-2">
                      <label htmlFor="comment" className="block">
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        rows="3"
                        required
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="border p-2 rounded-md w-full"
                      ></textarea>
                    </div>
                    <button
                      disabled={loading}
                      type="submit"
                      className={`${
                        loading
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white p-2 rounded-md mt-4`}
                    >
                      Submit
                    </button>
                  </form>
                ) : (
                  <Message>
                    Please{" "}
                    <Link to={"/login"} className="font-bold">
                      sign in
                    </Link>{" "}
                    to write a review
                  </Message>
                )}
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default ProductDetail;
