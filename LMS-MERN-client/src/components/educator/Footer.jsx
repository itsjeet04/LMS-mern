import React from 'react';
import { assets } from '../../assets/assets';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white-900 text-black-900 border-t border-blue-700 mt-auto py-4 px-6 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
        <img src={assets.logo}></img>
        <div className="text-center md:text-left">
          <p className="text-sm">&copy; {currentYear} Educator Dashboard. All Rights Reserved.</p>
        </div>

        <div className="flex items-center space-x-6">
          <a href="/help" className="text-sm hover:text-black transition-colors duration-200">
            Help Center
          </a>
          <a href="/terms" className="text-sm hover:text-black transition-colors duration-200">
            Terms of Service
          </a>
          <a href="/privacy" className="text-sm hover:text-black transition-colors duration-200">
            Privacy Policy
          </a>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;
