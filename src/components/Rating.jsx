import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text, color }) => {
  const stars = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 0.5;
    return (
      <span key={index}>
        {value >= starValue ? (
          <FaStar style={{ color }} />
        ) : value >= index ? (
          <FaStarHalfAlt style={{ color }} />
        ) : (
          <FaRegStar style={{ color }} />
        )}
      </span>
    );
  });

  return (
    <div className="rating flex items-center">
      {stars}
      <span className="rating-text">{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
