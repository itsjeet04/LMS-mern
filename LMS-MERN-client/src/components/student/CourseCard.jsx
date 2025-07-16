import React from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

function CourseCard({ course }) {
  const { currency, calcCourseRating } = React.useContext(AppContext);
  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="block bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden"
    >
      <img
        src={course.courseThumbnail}
        alt="Course Thumbnail"
        // className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {course.courseTitle}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          {course.educator.name}
        </p>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-yellow-600 font-medium">
            {calcCourseRating(course)}
          </p>
          <div className="flex space-x-0.5">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={i < Math.floor(calcCourseRating(course)) ? assets.star : assets.star_blank}
                alt="star"
                className="w-4 h-4"
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">{course.courseRatings.length}</p>
        </div>
        <p className="text-base font-semibold text-blue-600">
          {currency}
          {(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default CourseCard;
