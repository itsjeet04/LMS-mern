import React, { useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from "../../context/AppContext";
import SearchBar from '../../components/student/SearchBar';
import { useParams } from 'react-router-dom';
import CourseCard from '../../components/student/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../components/student/Footer';

function CourseList() {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourses, setFilteredCourses] = React.useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice()
      input ?
        setFilteredCourses(tempCourses.filter(course => course.courseTitle.toLowerCase().includes(input.toLowerCase()))) :
        setFilteredCourses(tempCourses)
    }
  }, [input, allCourses]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="bg-white shadow-md py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">Course List</h1>
            <p className="mt-1 text-sm text-gray-500">
              <span onClick={() => { navigate("/") }} className='text-blue-600 hover:text-blue-800 cursor-pointer transition duration-150 ease-in-out'>Home</span>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-700">Course List</span>
            </p>
          </div>

          {/* input is taken from param and opens a page with similar search */}
          <div className="w-full sm:w-auto">
            <SearchBar data={input} />
          </div>
        </div>
      </div>

      {input &&
        <div>
          <p className="inline-flex items-center gap-4 px-4 py-2 border  mt-8 mb-8 text-gray-600">
            Search Results for "{input}"

            <img src={assets.cross_icon} alt="cross icon" onClick={() => { navigate("/course-list") }} className="cursor-pointer " />
          </p>
        </div>
      }


      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-3 bg-white rounded-lg shadow p-6 min-h-[400px] flex items-center justify-center text-gray-500 text-lg">
          {filteredCourses.map((course, index) => <CourseCard key={index} course={course} />)}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CourseList;