import { useState } from "react";
import "./Header.css";
import Container from "./common/Container";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { Badge } from "react-bootstrap";
// import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

 

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(cartItems);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const logoutHandler =() =>{
    console.log("logout")
  }
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <Container className="mx-auto flex items-center justify-between relative">
        <div>
          <Link to={"/"}>
            <div className=" text-white font-semibold text-lg">TechMania</div>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div
          className={`menu md:flex ${
            isMenuOpen ? "block" : "hidden"
          } items-center space-x-4`}
        >
          <div>
            <form action="" type="submit">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-700 text-white rounded-md py-2 pl-8 pr-4 focus:outline-none focus:ring focus:border-blue-300 mr-[15px]"
              />
              <button className="bg-transparent border-teal-300 text-teal-300 border hover:bg-teal-300 hover:text-gray-800 hover:border-teal-300 py-2 px-4 rounded">
                Search
              </button>
            </form>
          </div>

          <Link to={"/cart"} className="flex items-center">
            {/* <button className="text-white flex"> */}
            <div>
              <AiOutlineShoppingCart
                size={"1.5rem"}
                className="text-teal-300"
              />
            </div>

            <div>
              {cartItems.length > 0 && (
                <div className=" bg-teal-300 text-black rounded-full px-2 py-1">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </div>
              )}
            </div>

            {/* </button> */}
          </Link>

          {userInfo ? (
          <div className="relative group">
            <button
              onClick={toggleDropdown}
              className="text-white group-hover:text-gray-300 focus:outline-none"
            >
              {userInfo.name}
            </button>
            {isDropdownVisible && (
              <ul className="absolute left-0 mt-2 bg-white text-gray-800 border border-gray-200 rounded-md shadow-md">
                <li>
                  <Link
                    to="/profile"
                    onClick={toggleDropdown}
                    className="block px-4 py-2 hover:bg-blue-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logoutHandler();
                      toggleDropdown();
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-blue-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login" className="text-white hover:text-gray-300">
            Sign In
          </Link>
        )}
        </div>
      </Container>
    </nav>
  );
};

export default Header;
