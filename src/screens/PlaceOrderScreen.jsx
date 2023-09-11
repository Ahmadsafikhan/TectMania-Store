import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import Loader from "../components/Loader";
import { clearCartItems } from "../slices/cartSlice";
import axios from "axios"; // Import Axios
import Container from "../components/common/Container";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/checkout");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/orders", {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      });

      if (response.status !== 201) {
        throw new Error("Failed to create order");
      }

      const data = response.data;
      dispatch(clearCartItems());
      navigate(`/order/${data._id}`);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Container className="p-4 mx-auto max-w-[650px]">
        {" "}
        <CheckoutSteps step1 step2 step3 step4 />
      </Container>
      <Container className="p-4 mx-auto">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-8/12">
            <div className="bg-white p-4 shadow-md">
              <h2 className="text-2xl font-bold">Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>

            <div className="bg-white p-4 mt-4 shadow-md">
              <h2 className="text-2xl font-bold">Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </div>

            <div className="bg-white p-4 mt-4 shadow-md">
              <h2 className="text-2xl font-bold">Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {cart.cartItems.map((item, index) => (
                    <li key={index} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-12 h-12">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </div>
                        <div className="flex-grow">
                          <Link
                            to={`/product/${item.product}`}
                            className="text-blue-500 hover:underline"
                          >
                            {item.name}
                          </Link>
                          <p>
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="md:w-4/12">
            <div className="bg-white p-4 shadow-md">
              <h2 className="text-2xl font-bold">Order Summary</h2>
              <div className="mt-4">
                <div className="flex justify-between">
                  <span>Items</span>
                  <span>${cart.itemsPrice}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Shipping</span>
                  <span>${cart.shippingPrice}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Tax</span>
                  <span>${cart.taxPrice}</span>
                </div>
                <div className="flex justify-between mt-2">
                  <span>Total</span>
                  <span>${cart.totalPrice}</span>
                </div>
              </div>
              {error && (
                <Message variant="error" className="mt-4">
                  Error making order
                </Message>
              )}
              <div className="mt-4">
                <button
                  type="button"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </button>
                {isLoading && (
                  <div className="mt-2">
                    {/* Assuming you have a Loader component */}
                    <Loader />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PlaceOrderScreen;
