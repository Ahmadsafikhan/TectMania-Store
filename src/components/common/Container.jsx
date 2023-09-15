import React from "react";

const Container = ({ children, className, ...restProps }) => {
  return (
    <div className={`max-w-[1100px] ${className || ""}`} {...restProps}>
      {children}
    </div>
  );
};

export default Container;

// 1100
