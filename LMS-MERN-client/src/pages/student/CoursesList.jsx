import React, { useContext, useMemo } from 'react';
import { AppContext } from "../../context/AppContext";
import SearchBar from '../../components/student/SearchBar';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CourseCard from '../../components/student/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../components/student/Footer';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function CourseList() {
  const { allCourses, isLoading } = useContext(AppContext);
  const { input } = useParams();
  const navigate = useNavigate();

  const filteredCourses = useMemo(() => {
    if (!allCourses || allCourses.length === 0) {
      return [];
    }
    const tempCourses = allCourses.slice();
    if (!input) {
      return tempCourses;
    }
    return tempCourses.filter(course =>
      course.courseTitle.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, allCourses]);

  const handleClearSearch = () => {
    navigate("/course-list");
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <header className="bg-white shadow-md py-6 px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900">Our Courses</h1>
            <p className="mt-1 text-sm text-gray-500">
              <Link to="/" className='text-blue-600 hover:text-blue-800 transition-colors'>Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-700">Course List</span>
            </p>
          </div>
          <div className="w-full sm:w-auto sm:max-w-xs">
            <SearchBar data={input} />
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 w-full">
        {input && (
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-4 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-800">
              <span>Search Results for: <strong>"{input}"</strong></span>
              <button onClick={handleClearSearch} aria-label="Clear search" className="p-1 rounded-full hover:bg-blue-200 transition-colors">
                <img src={assets.cross_icon} alt="Clear search" className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 min-h-[400px]">
          {isLoading ? (
            <LoadingSpinner />
          ) : filteredCourses.length > 0 ? (
           
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course._id || course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <h3 className="text-2xl font-semibold mb-2">No Courses Found</h3>
              <p>We couldn't find any courses matching your search. Try a different term!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CourseList;