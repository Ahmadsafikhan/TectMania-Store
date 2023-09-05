import React, { useEffect, useState } from "react";
import Container from "../components/common/Container";
import ProductCard from "../components/common/ProductCard";
import axios from "axios";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        setError(error); // Set error if there's an issue
        setLoading(false); // Set loading to false when there's an error
      });
  }, []);

  return (
    <Container className="mx-auto p-4">
      <div className="pt-[5rem]">
        <h1 className="text-4xl font-semibold mb-8 text-center">
          Welcome to TechMania
        </h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="error">Error fetching products: {error.message}</Message>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {products.map((item) => (
              <ProductCard key={item._id}>
                <Link to={`/products/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-contain mb-4"
                  />
                </Link>
                <Link to={`/products/${item._id}`}>
                  <h2 className="text-lg font-semibold mb-2 overflow-ellipsis whitespace-nowrap overflow-hidden">
                    {item.name}
                  </h2>
                </Link>
                <div className="flex justify-between items-center absolute left-5 right-5 bottom-5">
                  <p className="text-gray-600 mb-2">${item.price}</p>
                  <Rating
                    value={item.rating}
                    text={`${item.numReviews} reviews`}
                  />
                </div>
              </ProductCard>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default HomeScreen;
