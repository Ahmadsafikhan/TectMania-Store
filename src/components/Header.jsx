import { useEffect, useState, useRef } from "react";
import "./Header.css";
import Container from "./common/Container";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import logoPic from "../assets/images/logoo-removebg-preview.png"
import axios from "axios"; // Import Axios

import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiSolidDownArrow } from "react-icons/bi";
import { clearCartItems } from "../slices/cartSlice";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isDropdownVisibleAdmin, setDropdownVisibleAdmin] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const menuRef = useRef(null);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = (event) => {
    event.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };
  const logoutHandler = async () => {
    console.log("logout");
    try {
      // Make a POST request to log the user out
      await axios.post("/api/users/logout"); // Replace '/api/logout' with the actual logout API endpoint

      // Dispatch the logout action and redirect to login page
      dispatch(logout());
      dispatch(clearCartItems());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleDropdownAdmin = () => {
    setDropdownVisibleAdmin(!isDropdownVisibleAdmin);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== "") {
      navigate(`/search/${encodeURIComponent(searchValue)}`);
      setSearchValue(""); // Clear the search input field
    }
  };

  useEffect(() => {
    const closeMenu = (event) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Add a click event listener to the document
    document.addEventListener("click", closeMenu);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-gray-800 p-4">
      <Container className="mx-auto flex items-center justify-between relative">
        <div>
          <Link to={"/"}>
            {/* <div className=" text-white font-semibold text-lg">TechMania</div> */}
            <img src={logoPic} alt="logo" className="w-[150px] md:w-[170px]" />
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
          } items-center space-x-4 z-50`}
          ref={menuRef}
        >
          <div>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="bg-gray-700 text-white rounded-md py-2 pl-8 pr-4 focus:outline-none focus:ring focus:border-blue-300 mr-[15px]  w-[213px] ml-[-11px]"
              />
              <button
                type="submit"
                className="bg-transparent border-teal-300 text-teal-300 border hover:bg-teal-300 hover:text-gray-800 hover:border-teal-300 py-2 px-4 rounded"
                onClick={closeMenu}
              >
                Search
              </button>
            </form>
          </div>

          {!userInfo?.isAdmin && <Link to={"/cart"} className="flex items-center" onClick={closeMenu}>
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
          </Link>}

          {userInfo ? (
            <div className="relative group">
              <div className="flex items-center">
                <button
                  onClick={toggleDropdown}
                  className="text-white group-hover:text-gray-300 focus:outline-none"
                >
                  {userInfo.name}
                </button>
                <BiSolidDownArrow className="text-white text-[10px] ml-[5px]" />
              </div>
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
            <Link
              to="/login"
              className="text-white hover:text-gray-300"
              onClick={closeMenu}
            >
              Sign In
            </Link>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className="relative inline-block text-left">
              <button
                className="bg-teal-300 text-gray-800 py-2 px-4 rounded border border-teal-300 hover:bg-gray-800 hover:text-teal-300 hover:border-teal-300 flex items-center"
                onClick={toggleDropdownAdmin}
              >
                Admin
                <span className="ml-1">
                  <BiSolidDownArrow className="text-[10px]" />
                </span>
              </button>

              {isDropdownVisibleAdmin && (
                <div className="origin-top-right absolute right-[-40px] mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200">
                  <div className="py-1">
                    <Link
                      to={"/admin/productList"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={toggleDropdownAdmin}
                    >
                      Products
                    </Link>
                    <Link
                      to={"/admin/orderList"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={toggleDropdownAdmin}
                    >
                      Orders
                    </Link>
                    <Link
                      to={"/admin/usersList"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={toggleDropdownAdmin}
                    >
                      Users
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default Header;
