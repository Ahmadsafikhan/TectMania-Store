import React, { useRef } from "react";
import "./HeroSection.css";
import backgroundImage from "../../assets/images/heroimage.jpg"; // Adjust the path based on your folder structure
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();
  const buttonRef = useRef();
  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleClick = () => {
    scrollToRef(buttonRef);
  };
  return (
    <div
      className="bg-cover bg-center bg-no-repeat h-[650px] relative"
      style={{
        backgroundImage: `url("${backgroundImage}")`, // Replace with your image path
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white p-[30px]">
        <div className="typewriter-text text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center">
          <p className="responsive-text">
            Empowering Innovation, One Click at a Time<br/> Explore the Future of Tech Shopping!
          </p>
        </div>
        
        <button
          ref={buttonRef}
          className="bg-teal-300 hover:bg-gray-800 text-gray-800 hover:text-teal-300 py-2 px-4 rounded border border-teal-300 hover:border-teal-300 mt-4"
          onClick={handleClick}
        >
          Shop Now!
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
