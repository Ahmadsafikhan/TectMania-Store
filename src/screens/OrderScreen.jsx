import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import axios from "axios"; // Import Axios
import Container from "../components/common/Container";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrder(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);


  
  return (
    <Container className="p-4 mx-auto">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error.message}</Message>
      ) : (
        <>
          <h1 className=" font-semibold mb-4">Order {order._id}</h1>
          <div className="md:flex">
            <div className="md:w-2/3 md:pr-4">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Shipping</h2>
                <p className="mb-2">
                  <strong>Name: </strong> {order.user.name}
                </p>
                <p className="mb-2">
                  <strong>Email: </strong>{" "}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p className="mb-2">
                  <strong>Address:</strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>
                {/* {order.isDelivered ? (
                  <Message variant="success">
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant="error">Not Delivered</Message>
                )} */}
              </div>

              {/* <div className="mb-4">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <p className="mb-2">
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
                ) : (
                  <Message variant="error">Not Paid</Message>
                )}
              </div> */}

              <div>
                <h2 className="text-xl font-semibold">Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ul>
                    {order.orderItems.map((item, index) => (
                      <li
                        key={index}
                        className="border-b py-4 flex items-center space-x-4"
                      >
                        <div className="w-1/4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="w-1/2">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div className="w-1/4">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="md:w-1/3 mt-4 md:mt-0">
              <div className="border p-4">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <div className="mt-4">
                  <div className="flex justify-between mb-2">
                    <span>Items</span>
                    <span>${order.itemsPrice}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>${order.shippingPrice}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Tax</span>
                    <span>${order.taxPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-semibold">${order.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};

export default OrderScreen;
