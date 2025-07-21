import React from 'react';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Column 1: Logo & Description */}
        <div>
          <img src={assets.logo_dark} alt="logo" className="w-32 mb-4" />
          <p className="text-sm text-gray-400">
            Welcome to our Learning Management System (LMS) where you can explore a wide range of courses and enhance your skills.
            <br /> Join us in this journey of knowledge and growth!
          </p>
        </div>

        {/* Column 2: Explore */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Explore</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
            <li><Link to="/support">Support</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}
        <Link to="/" className="inline-block mx-2 align-middle">
          <img src={assets.logo} alt="logo" className="inline-block w-5 h-5" />
        </Link>
        All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
