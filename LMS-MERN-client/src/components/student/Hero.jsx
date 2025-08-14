import React from 'react';
import { assets } from "../../assets/assets";
import { ArrowRight } from 'lucide-react'; 

function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-gradient-to-b from-purple-50 via-white to-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Text Content & CTA */}
          <div className="text-center lg:text-left lg:w-1/2">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Unlock Your Potential.
              <br />
              <span className="text-blue-600">Master New Skills.</span>
            </h1>
            
            <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
              Join thousands of learners on their journey to success. Our platform offers flexible, expert-led courses designed to help you achieve your goals.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start gap-4">
              <a 
                href="course-list" 
                className="inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#learn-more" 
                className="inline-flex items-center justify-center px-6 py-3 font-semibold text-blue-500 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <img 
              src={assets.sketch} 
              alt="Person sketching a brilliant idea" 
              className="w-4/5 md:w-3/5 lg:w-full max-w-md lg:max-w-xl rounded-xl shadow-2xl transform transition-transform hover:scale-105"
            />
          </div>

        </div>
      </div>
       {/* Optional: Add some decorative shapes for more visual flair */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-200 rounded-full opacity-20 -translate-x-10 -translate-y-10 blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-200 rounded-full opacity-20 translate-x-10 translate-y-10 blur-2xl"></div>
    </section>
  );
}

export default Hero;