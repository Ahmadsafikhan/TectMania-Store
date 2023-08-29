import React from 'react';

const CustomRow = ({ children }) => {
  return (
    <div className="flex flex-wrap -mx-4">
      {children}
    </div>
  );
};

export default CustomRow;