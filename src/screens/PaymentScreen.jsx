import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/common/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";
import Container from "../components/common/Container";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/checkout");
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [paymentMethodj, setPaymentMethodj] = useState("JazzCash");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <>
      <Container className="p-4 mx-auto max-w-[650px]">
        {" "}
        <CheckoutSteps step1 step2 step3 />
      </Container>
      <FormContainer>
        <h1>Payment Method</h1>
        <form
          onSubmit={submitHandler}
          className="p-4 bg-white rounded-lg"
        >
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select Method
            </label>
            <div className="flex items-center">
              <input
                type="radio"
                className="form-radio text-primary-500 h-5 w-5"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={() => setPaymentMethod("PayPal")}
              />
              <label htmlFor="PayPal" className="ml-2 text-gray-700">
                PayPal or Credit Card
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                className="form-radio text-primary-500 h-5 w-5"
                id="JazzCash"
                name="paymentMethod"
                value="JazzCash"
                checked={paymentMethod === "JazzCash"}
                onChange={() => setPaymentMethod("JazzCash")}
              />
              <label htmlFor="PayPal" className="ml-2 text-gray-700">
                JazzCash
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 disabled:bg-blue-300 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Continue
          </button>
        </form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
