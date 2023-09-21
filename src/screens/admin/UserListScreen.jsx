import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import axios from 'axios'; 
import Container from '../../components/common/Container';
// import { USERS_URL } from '../../constants';

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <Container className="p-4 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <table className="min-w-full bg-white border-collapse border border-gray-300">
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
            {users.map((user) => (
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
                        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mr-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                        onClick={() => deleteHandler(user._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </Container>
    </>
  );
};

export default UserListScreen;
