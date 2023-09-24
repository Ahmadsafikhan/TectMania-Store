// SearchResultScreen.jsx
import React, { useEffect, useState } from 'react';
import Container from '../components/common/Container';
import ProductCard from '../components/common/ProductCard';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';

const SearchResultScreen = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/search?keyword=${keyword}`);
        setProducts(data); // Assuming the API response structure matches the expected product array
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <Container className="mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-8 text-center md:text-3xl lg:text-4xl">
        Search Results for "{keyword}"
      </h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">
          Error fetching products: {error.message}
        </Message>
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
                {/* Add rating component here */}
              </div>
            </ProductCard>
          ))}
        </div>
      )}
    </Container>
  );
};

export default SearchResultScreen;
