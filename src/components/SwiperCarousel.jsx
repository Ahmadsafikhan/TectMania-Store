import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "./SwiperCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination, Navigation, Mousewheel } from "swiper";
import Container from "./common/Container";
import Message from "../components/Message";
import Loader from "../components/Loader";

const SwiperCarousel = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topRatedProducts, setTopRatedProducts] = useState([]);

  useEffect(() => {
    const fetchTopRatedProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products/top`);
        setTopRatedProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchTopRatedProducts();
  }, []);

  return (
    <Container className="mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-8 text-center md:text-3xl lg:text-4xl">
        Top Products
      </h1>
      {loading && <Loader />} {/* Show a loader while loading */}
      {error && <Message variant="error">{error.message}</Message>}
      {!loading && !error && topRatedProducts.length === 0 && (
        <Message variant="warning">No products found.</Message>
      )} {/* Show a message when no products are available */}
      {!loading && !error && topRatedProducts.length > 0 && (
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          spaceBetween={-50}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation, Mousewheel]}
        >
          {topRatedProducts.map((item) => (
            <SwiperSlide
              key={item._id}
              className="bg-white p-4 shadow-custom rounded-md w-[20rem] h-[25rem] relative text-center mb-[40px]"
            >
              <Link to={`/products/${item._id}`} className="product-link">
                <div>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h2 className="product-title">{item.name}</h2>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Container>
  );
};

export default SwiperCarousel;
