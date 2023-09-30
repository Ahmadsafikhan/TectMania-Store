import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import axios from "axios";
import Container from "../../components/common/Container";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const OrderListScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        console.log("Orders:", response.data);
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const ordersToShow = orders.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const totalPages = Math.ceil(orders.length / perPage);

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

  return (
    <Container className="mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold">Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="max-sm:max-w-[500px] sm:w-full overflow-x-scroll ">
          <table className="min-w-full bg-white border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="text-left text-gray-600 bg-gray-100">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">USER</th>
                <th className="px-4 py-2">DATE</th>
                <th className="px-4 py-2">TOTAL</th>
                <th className="px-4 py-2">DELIVERED</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {ordersToShow.map((order) => (
                <tr key={order._id}>
                  <td className="border px-4 py-2">{order._id}</td>
                  <td className="border px-4 py-2">
                    {order.user && order.user.name}
                  </td>
                  <td className="border px-4 py-2">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="border px-4 py-2">${order.totalPrice}</td>
                  <td className="border px-4 py-2">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <span className="text-red-500">Pending</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">
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
  );
};

export default OrderListScreen;
