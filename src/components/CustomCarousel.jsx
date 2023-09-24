import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import './CustomCarousel.css';

const CustomCarousel = () => {
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
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Top Rated Products</h1>
        <div className="carousel-container">
          <Carousel
            showArrows={true}
            showStatus={false}
            showIndicators={false}
            infiniteLoop={true}
            autoPlay={true}
            emulateTouch={true}
            swipeable={true}
            stopOnHover={true}
          >
            {topRatedProducts.map((item) => (
              <div key={item._id} className="carousel-item">
                <div className="product-card">
                  <Link to={`/products/${item._id}`} className="product-link">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="product-image"
                    />
                    <h2 className="product-title">{item.name}</h2>
                    <p className="product-price">$ {item.price}</p>
                    <div className="product-rating">
                      {/* Add rating stars here */}
                      <span className="rating-stars">★★★★★</span>
                      <span className="rating-count">({item.rating})</span>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default CustomCarousel;
