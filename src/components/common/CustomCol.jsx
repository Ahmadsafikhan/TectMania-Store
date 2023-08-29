import React from 'react';

const CustomCol = ({ size, children }) => {
  return (
    <div className={`w-${size}/12 px-4`}>
      {children}
    </div>
  );
};

export default CustomCol;
