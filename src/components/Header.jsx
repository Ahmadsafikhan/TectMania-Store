import { useState } from "react";
import "./Header.css";
import Container from "./common/Container";
// import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <Container className="mx-auto flex items-center justify-between relative">
        <div>
          <div className=" text-white font-semibold text-lg">My Store</div>
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
                className="bg-gray-700 text-white rounded-md py-2 pl-8 pr-4 focus:outline-none focus:ring focus:border-blue-300"
              />
              <button className="bg-white text-black">Search</button>
            </form>
          </div>

          <button className="text-white">cart</button>
          <button className="text-white">Sign In</button>
        </div>
      </Container>
    </nav>
  );
};

export default Header;
