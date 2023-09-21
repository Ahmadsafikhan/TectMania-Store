import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/common/FormContainer";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "../../components/common/Container";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/users/${userId}`);
      setLoading(false);
      const userData = response.data;
      setName(userData.name);
      setEmail(userData.email);
      setIsAdmin(userData.isAdmin);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(`/api/users/${userId}`, { name, email, isAdmin });
      setLoading(false);
      toast.success("User updated successfully");
      navigate("/admin/usersList");
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <>
      <Container className="p-4 mx-auto">
        <Link
          to="/admin/usersList"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mb-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Go Back
        </Link>
        <FormContainer>
          <h1 className="text-2xl mb-4">Edit User</h1>
          {loading && <Loader />}
          {error && <Message variant="danger">{error}</Message>}
          {!loading && !error && (
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="inline-flex items-center text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-500"
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                  <span className="ml-2">Is Admin</span>
                </label>
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
            </form>
          )}
        </FormContainer>
      </Container>
    </>
  );
};

export default UserEditScreen;
