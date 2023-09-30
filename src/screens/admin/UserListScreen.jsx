import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import axios from 'axios'; 
import Container from '../../components/common/Container';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
// import { USERS_URL } from '../../constants';

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const usersToShow = users.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(users.length / perPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await axios.delete(`/api/users/${id}`);
        // Update the users list after successful deletion
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        toast.error(err.message || 'An error occurred while deleting the user.');
      }
    }
  };

  return (
    <>
    <Container className="py-10 px-4 mx-auto">
      <h1 className="text-2xl font-bold">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className="max-sm:max-w-[500px] sm:w-full overflow-x-scroll " >
        <table className="min-w-full bg-white border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase ">
              <th className="py-2 px-4 text-start">ID</th>
              <th className="py-2 px-4 text-start">NAME</th>
              <th className="py-2 px-4 text-start">EMAIL</th>
              <th className="py-2 px-4 text-start">ADMIN</th>
              <th className="py-2 px-4 text-start"></th>
            </tr>
          </thead>
          <tbody>
            {usersToShow.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4">{user._id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">
                  <a href={`mailto:${user.email}`} className="text-blue-500">{user.email}</a>
                </td>
                <td className="py-2 px-4">
                  {user.isAdmin ? (
                    <span className="text-green-500">✓</span>
                  ) : (
                    <span className="text-red-500">✗</span>
                  )}
                </td>
                <td className="py-2 px-4 justify-center flex items-center">
                  {!user.isAdmin && (
                    <>
                      <Link
                        to={`/admin/user/${user._id}/edit`}
                       >
                       <button className="text-blue-500 hover:underline mr-2">
                          <FaEdit />
                        </button>
                      </Link>
                       <button
                        className="text-red-500 hover:underline"
                        onClick={() => deleteHandler(user._id)}
                      >
                         <FaTrash />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      <div className="flex justify-center mt-4">
      <button
          className="px-4 py-2 mr-2 bg-white rounded shadow-md transition duration-300 hover:bg-gray-200 hover:shadow-lg"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <AiOutlineArrowLeft />
        </button>
        <button
          className="px-4 py-2 ml-2 bg-white rounded shadow-md transition duration-300 hover:bg-gray-200 hover:shadow-lg"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <AiOutlineArrowRight />
        </button>
        </div>
      </Container>
    </>
  );
};

export default UserListScreen;
