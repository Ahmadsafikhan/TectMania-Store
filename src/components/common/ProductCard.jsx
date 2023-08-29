import React from "react";

const ProductCard = ({ children }) => {
  return (
    <div className="bg-white p-4 shadow-custom rounded-md w-[20rem] h-[25rem] relative text-center mb-[40px]">
      {children}
    </div>
  );
};

export default ProductCard;
