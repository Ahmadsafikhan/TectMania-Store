import React, { forwardRef, useEffect, useState } from "react";
import Container from "../components/common/Container";
import ProductCard from "../components/common/ProductCard";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CustomCarousel from "../components/CustomCarousel";
import SwiperCarousel from "../components/SwiperCarousel";
import HeroSection from "../components/common/HeroSection";

const HomeScreen = forwardRef((props, ref) => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const { keyword } = useParams(); // Add keyword from URL params
  const [products, setProducts] = useState([]);
  // const [topRatedProducts, setTopRatedProducts] = useState([]); // Add state for top-rated products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(pageNumber || 1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Set loading true
        setLoading(true);
        const { data } = await axios.get(`/api/products?page=${page}`);
        console.log(data, "abcd");
        setProducts(data.products);
        // set Loading false
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);
   // Handle search query
   useEffect(() => {
    if (keyword) {
      navigate(`/search/${keyword}`);
    }
  }, [keyword, navigate]);

  const handleNext = () => {
    setPage((prevState) => prevState + 1);
  };

  const handlePrev = () => {
    setPage((prevState) => Math.max(prevState - 1, 1));
  };

  useEffect(() => {
    navigate(`/page/${page}`);
  }, [page]);

  return (
    <>
     <HeroSection homeScreenRef={ref} />
      <Container className="mx-auto p-4">
       
        <div className="pt-[1rem]">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="error">
              Error fetching products: {error.message}
            </Message>
          ) : (
            <div>
              {/* Carousel for top-rated products */}
              <SwiperCarousel />
              <h1 className="text-2xl font-semibold mb-8 text-center md:text-3xl lg:text-4xl">
                Latest Products
              </h1>

              <div className="flex flex-wrap gap-4 justify-center">
                {products?.map((item) => (
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
            </div>
          )}
        </div>
        <div>
          <button onClick={handlePrev}>{"<"}</button>

          <span>{pageNumber}</span>
          <button onClick={handleNext}>{">"}</button>
        </div>
      </Container>
    </>
  );
});

export default HomeScreen;
