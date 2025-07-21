import React from 'react';
import { assets } from '../../assets/assets';

function CallToAction() {
  return (
    <section className="bg-blue-500 text-white py-12 px-6 md:px-16 rounded-2xl my-10 shadow-lg text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Join our community of learners and start your journey today!
      </h1>
      <p className="text-base md:text-lg max-w-3xl mx-auto mb-6 text-white/90">
        Sign up now to access a wide range of courses and resources that will help you achieve your personal and professional goals. Don't miss out on the opportunity to learn from industry experts and connect with like-minded individuals.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
        <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
          Get Started
        </button>
        <button className="flex items-center justify-center gap-2 border border-white text-white font-medium px-6 py-3 rounded-full hover:bg-white hover:text-blue-700 transition">
          Learn More 
          <img src={assets.arrow_icon} alt="arrow icon" className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}

export default CallToAction;
