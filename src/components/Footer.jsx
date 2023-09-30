import React from 'react';
import Container from './common/Container';
import { Link } from 'react-router-dom';
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiOutlineInstagram
} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <Container className="mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          {/* About Section */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold mb-2">About Us</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo at metus cursus congue.
            </p>
          </div>

          {/* Services Section */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold mb-2">Our Services</h2>
            <ul className="text-sm">
              <li>Service 1</li>
              <li>Service 2</li>
              <li>Service 3</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <p className="text-sm">
              Email: <Link>info@example.com</Link>
            </p>
            <p className="text-sm">
              Phone: +123-456-7890
            </p>
          </div>

          {/* Social Media Links */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-4 justify-center">
              <Link to="/" className="text-white">
                <AiFillFacebook size={32} />
              </Link>
              <Link to="/" className="text-white">
                <AiFillYoutube size={32} />
              </Link>
              <Link to="/" className="text-white">
                <AiFillTwitterSquare size={32} />
              </Link>
              <Link to="/" className="text-white">
                <AiOutlineInstagram size={32} />
              </Link>
            </div>
          </div>
        </div>

        <p className="text-sm mt-4 text-center">
          &copy; {new Date().getFullYear()} TechMania. All Rights Reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
