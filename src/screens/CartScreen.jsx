import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Container from "../components/common/Container";

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    console.log("remove");
    dispatch(removeFromCart(id));
  };

  const increaseQuantityHandler = (item) => {
    addToCartHandler(item, item.qty + 1);
  };

  const decreaseQuantityHandler = (item) => {
    if (item.qty > 1) {
      addToCartHandler(item, item.qty - 1);
    }
  };
  const checkoutHandler = () => {
    // Implement your checkout logic here
  };

  return (
    <Container className="mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty.{" "}
          <Link to={"/"}>
            <p>Go Back</p>
          </Link>
        </Message>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-8">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row justify-between items-center border-b pb-4 mb-4 md:mb-0"
              >
                <div className="w-24 md:w-32 h-24 md:h-32 mb-2 md:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Product Name */}
                <div className="flex flex-col justify-between md:w-2/4 items-center">
                  <div className="md:w-2/4 md:pl-4">
                    <Link
                      to={`/products/${item._id}`}
                      className="text-blue-500"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="md:w-1/4 mt-2 md:mt-0 text-center md:text-left">
                    ${item.price}
                  </div>
                </div>
                <div className="md:w-1/4 mt-2 md:mt-0">
                  <div className="flex items-center justify-center md:justify-start">
                    <button
                      type="button"
                      onClick={() => decreaseQuantityHandler(item)}
                      className="text-red-500 text-xl md:text-base"
                    >
                      -
                    </button>
                    <span className="mx-2 text-xl md:text-base">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => increaseQuantityHandler(item)}
                      className="text-green-500 text-xl md:text-base"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="md:w-1/4 mt-2 md:mt-0 flex justify-center md:justify-end">
                  <button
                    type="button"
                    className="text-red-500 text-xl md:text-base"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-4">
            <div className="bg-white rounded p-4">
              <h2 className="text-lg font-semibold mb-2">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                items)
              </h2>
              <p className="text-xl font-bold">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
              <button
                type="button"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className="bg-teal-300 hover:bg-gray-800 text-gray-800 hover:text-teal-300 py-2 px-4 rounded border border-teal-300 hover:border-teal-300 mt-4 w-full"
              >
                <Link to={"/checkout"}>Continue </Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CartScreen;
