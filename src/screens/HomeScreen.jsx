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
import { useSelector } from "react-redux";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const HomeScreen = forwardRef((props, ref) => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const { keyword } = useParams(); // Add keyword from URL params
  const [products, setProducts] = useState([]);
  // const [topRatedProducts, setTopRatedProducts] = useState([]); // Add state for top-rated products
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(pageNumber || 1);
  const [displayedProducts, setDisplayedProducts] = useState(6);
  const { userInfo } = useSelector((state) => state.auth);

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
  const handleShowMore = () => {
    setDisplayedProducts((prevCount) => prevCount + 6); // Increase the number of displayed products by 6
  };

  useEffect(() => {
    navigate(`/page/${page}`);
  }, [page]);

  return (
    <>
      {!userInfo?.isAdmin && <HeroSection homeScreenRef={ref} />}
      <Container className="mx-auto p-4">
        <div className="pt-[1rem]">
        <SwiperCarousel />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="error">
              Error fetching products: {error.message}
            </Message>
          ) : (
            <div>
              {/* Carousel for top-rated products */}
              
              <h1 className="text-2xl font-semibold mb-8 text-center md:text-3xl lg:text-4xl">
                Latest Products
              </h1>

              <div className="flex flex-wrap gap-[3rem] justify-center">
                {products.slice(0, displayedProducts)?.map((item) => (
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
              {displayedProducts < products.length && (
                <div className="text-center mt-4">
                  <button
                    onClick={handleShowMore}
                    className="bg-teal-300 hover:bg-gray-800 text-gray-800 hover:text-teal-300 py-2 px-4 rounded border border-teal-300 hover:border-teal-300"
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
        <button
      className="px-4 py-2 mr-2 bg-white rounded shadow-md transition duration-300 hover:bg-gray-200 hover:shadow-lg"
      onClick={handlePrev}
    >
      <AiOutlineArrowLeft color="black" />
    </button>

          <span>{pageNumber}</span>
          <button
            className="px-4 py-2 ml-2 bg-white rounded shadow-md transition duration-300 hover:bg-gray-200 hover:shadow-lg"
            onClick={handleNext}
          >
            <AiOutlineArrowRight color="black"/>
          </button>
        </div>
      </Container>
    </>
  );
});

export default HomeScreen;
