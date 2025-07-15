import React from 'react';
import { assets } from "../../assets/assets";

function Hero() {
  return (
    <section className="w-full py-16 px-4 flex flex-col items-center text-center bg-gray-50">
      
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 whitespace-nowrap">
        Empower your future with our provided course
      </h1>
      
      <p className="mt-4 text-gray-600 max-w-xl">
        Join thousands of learners and kickstart your journey towards a brighter, skill-rich future. Our platform offers flexible, high-quality education designed for everyone.
      </p>
      <img 
        src={assets.sketch} 
        alt="sketch" 
        className="mt-8 w-72 md:w-96 rounded-lg shadow-md"
      />
    </section>
  );
}

export default Hero;
