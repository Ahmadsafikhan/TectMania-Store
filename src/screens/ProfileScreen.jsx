import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import axios from "axios"; // Import Axios for making API requests
import Container from "../components/common/Container";
import { Link } from "react-router-dom";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]); // State to store orders
  const [error, setError] = useState(null); // Error state

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/orders/mine`); // Replace with your API endpoint
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };

        const { data } = await axios.put(
          `/api/users/profile`,
          { name, email, password },
          config
        );

        dispatch(setCredentials(data));
        setLoading(false);
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
        setLoading(false);
      }
    }
  };

  return (
    <Container className="px-4 py-10 mx-auto">
      <div className="flex   gap-16 flex-wrap">
      <div className="pt-4  lg:w-1/3 w-full FirstHalf">
          <h1 className="text-2xl font-semibold mb-4 ">Update Profile</h1>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium text-gray-700 ">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block font-medium text-gray-700"
              >
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
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="bg-teal-300 hover:bg-gray-800 text-gray-800 hover:text-teal-300 py-2 px-4 rounded border border-teal-300 hover:border-teal-300 mt-4"
            >
              Update
            </button>
            {loading && <Loader />}
          </form>
        </div>
        <div
          className={`${userInfo.isAdmin === true ? "hidden" : ""}   md:w-[60%] w-full  secondHalf`}
        >
          {loading ? (
            <div className=" ">
              <Loader />
            </div>
          ) : error ? (
            <Message variant="error">{error}</Message>
          ) : (
            <div className="max-sm:max-w-[500px] sm:w-full overflow-x-scroll">
            <h2 className="text-2xl font-semibold">My Orders</h2>
              <table className="min-w-full border-collapse border border-gray-300 mt-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left bg-gray-100 border-b">
                      ID
                    </th>
                    <th className="px-4 py-2 text-left bg-gray-100 border-b">
                      DATE
                    </th>
                    <th className="px-4 py-2 text-left bg-gray-100 border-b">
                      TOTAL
                    </th>
                    {/* <th className="px-4 py-2 text-left bg-gray-100 border-b">
                      PAID
                    </th>
                    <th className="px-4 py-2 text-left bg-gray-100 border-b">
                      DELIVERED
                    </th> */}
                    <th className="px-4 py-2 text-left bg-gray-100 border-b"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="px-4 py-2 border-b">{order._id}</td>
                      <td className="px-4 py-2 border-b">
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className="px-4 py-2 border-b">{order.totalPrice}</td>
                      {/* <td className="px-4 py-2 border-b">
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <div className="text-red-500">cross</div>
                        )}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <div className="text-red-500">cross</div>
                        )}
                      </td> */}
                      <td className="px-4 py-2 border-b">
                        <Link
                          to={`/order/${order._id}`}
                          className="text-blue-500 hover:underline"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            
          )}
        </div>
      </div>
    </Container>
  );
};

export default ProfileScreen;
