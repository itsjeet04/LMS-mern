import React from 'react';
import { Link } from 'react-router-dom';

function CoursesSection() {
  return (
    <section className="w-full bg-white py-16 px-4 text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Learn From the Best
        </h2>
        <p className="text-gray-600 text-lg">
          Explore our wide range of courses designed to help you master new skills and advance your career. Whether you're looking to learn programming, design, business, or any other field, we have something for everyone.
        </p>
        <Link
          to="/course-list"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Browse Courses
        </Link>
      </div>
    </section>
  );
}

export default CoursesSection;
