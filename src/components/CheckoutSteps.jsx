import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="flex flex-wrap justify-center text-center mt-8">
      <div className={`w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-4 ${step1 ? '' : 'text-gray-400'}`}>
        {step1 ? (
          <Link to="/login" className="text-blue-500">
            Sign In
          </Link>
        ) : (
          <span>Sign In</span>
        )}
      </div>

      <div className={`w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-4 ${step2 ? '' : 'text-gray-400'}`}>
        {step2 ? (
          <Link to="/Checkout" className="text-blue-500">
            Shipping
          </Link>
        ) : (
          <span>Shipping</span>
        )}
      </div>
      <div className={`w-full sm:w-1/2 md:w-1/4 lg:w-1/5 mb-4 ${step4 ? '' : 'text-gray-400'}`}>
        {step3 ? (
          <Link to="/placeorder" className="text-blue-500">
            Place Order
          </Link>
        ) : (
          <span>Place Order</span>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
