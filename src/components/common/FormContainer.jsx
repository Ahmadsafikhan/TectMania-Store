import React from 'react';

const FormContainer = ({ children }) => {
  return (
    <div className="flex justify-center items-center mt-5">
      <div className="bg-white shadow-md p-8 rounded-lg w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default FormContainer;