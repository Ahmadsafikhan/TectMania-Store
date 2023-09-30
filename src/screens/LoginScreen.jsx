import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/common/FormContainer";
import axios from "axios"; // Import Axios

import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Container from "../components/common/Container";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/users/login", {
        email,
        password,
      });

      const res = response.data;
      console.log("res", response);

      dispatch(setCredentials({ ...res }));
      navigate(redirect);
      setLoading(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <>
    <Container className='mx-auto py-10'>
      <FormContainer>
        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="bg-teal-300 hover:bg-gray-800 text-gray-800 hover:text-teal-300 py-2 px-4 rounded border border-teal-300 hover:border-teal-300"
          >
            Sign In
          </button>
          {loading && <Loader />}
        </form>

        <div className="py-3">
          <p className="text-gray-600">
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-teal-300 hover:text-teal-600"
            >
              Register
            </Link>
          </p>
        </div>
      </FormContainer>
      </Container>
    </>
  );
};

export default LoginScreen;
