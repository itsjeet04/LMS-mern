import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';

function MyCourse() {
  const { currency, allCourses } = useContext(AppContext);

  const [courses, setCourses] = useState();

  const fetchEducatorCourses = async () => {
    // In a real app, you might filter courses for the logged-in educator
    setCourses(allCourses || []); // Set to empty array to prevent map error if allCourses is null/undefined
  };

  useEffect(() => {
    fetchEducatorCourses();
  }, [allCourses]); // Dependency added for correctness

  return courses ? (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">My Courses</h2>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <td className="py-3 px-6 text-left">All Courses</td>
              <td className="py-3 px-6 text-left">Earnings</td>
              <td className="py-3 px-6 text-left">Students</td>
              <td className="py-3 px-6 text-left">Published on</td>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <img 
                        src={course.courseThumbnail} 
                        alt={course.courseTitle} 
                        className="w-16 h-10 rounded object-cover mr-4 shadow" 
                      />
                      <span className="font-medium">{course.courseTitle}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span className="font-semibold">
                      {currency}
                      {Math.floor(
                        course.enrolledStudents.length *
                          (course.coursePrice - (course.discount * course.coursePrice) / 100)
                      ).toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-center font-semibold">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(course.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              ))
            ) : (
              // Display this row if there are no courses
              <tr>
                <td colSpan="4" className="text-center py-10 text-gray-500">
                  You have not created any courses yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default MyCourse;