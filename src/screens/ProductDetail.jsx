import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/common/Container";
import axios from "axios";
import Rating from "../components/Rating";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { id: productId } = useParams();
  console.log(productId);

  useEffect(() => {
    axios
      .get(`/api/products/${productId}`)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="p-4 mx-auto h-[100vh]">
      <Link to={"/"}>Back</Link>
      <div className="flex flex-col md:flex-row justify-center items-center pt-[5rem] max-w-5xl">
        <div className="pr-0 md:pr-[6rem] mb-[1.5rem] md:mb-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-[300px] max-w-[16rem] mx-auto md:mx-0"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-2">${product.price}</p>
          <div>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            {/* {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'} */}
            <p
              className={`${
                product.countInStock > 0 ? "text-green-600" : "text-red-600"
              } font-semibold mb-4`}
            >
              {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
            </p>
          </div>
          <div className="mb-4">
            <button
              className="bg-yellow-500 hover:bg-yellow-700 text-white py-2 px-4 rounded mr-2"
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded">
              Wishlist
            </button>
          </div>
          <p className="mb-4">{product.description}</p>
        </div>
      </div>
    </Container>
  );
};

export default ProductDetail;
