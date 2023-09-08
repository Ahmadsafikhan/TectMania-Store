import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/common/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../slices/cartSlice";
import Loader from "../components/Loader";
import Container from "../components/common/Container";

const CheckoutScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    console.log("form submitted");
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <>
      <Container className="p-4 mx-auto max-w-[650px]">
        {" "}
        <CheckoutSteps step1 step2 />
      </Container>
      <FormContainer>
        <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="postcode"
              className="block font-medium text-gray-700"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="postcode"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="country"
              className="block font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 disabled:bg-blue-300 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Continue
          </button>
          {loading && <Loader />}
        </form>
      </FormContainer>
    </>
  );
};

export default CheckoutScreen;
