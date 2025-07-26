import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import Loading from '../../components/student/Loading';

function CourseDetails() {
  const { id } = useParams();
  const { allCourses, calcCourseRating } = useContext(AppContext);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    // Finds the course from the context based on the URL parameter.
    const course = allCourses.find(c => c._id === id);
    setCourseData(course);
  }, [id, allCourses]); // Re-run effect if id or course list changes

  // Display a loading spinner until the course data is available
  if (!courseData) {
    return <Loading />;
  }

  const ratingValue = calcCourseRating(courseData);
  const ratingCount = courseData.courseRatings.length;

  return (
    <div className="relative min-h-screen bg-gray-50">
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-cyan-100/60 to-gray-50 -z-0" />

      {/* Main Content Wrapper */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* --- Left Column: Course Information --- */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight">
              {courseData.courseTitle}
            </h1>
            
            {/* Using prose for clean typography on HTML content */}
            <div
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
              className="prose prose-lg text-gray-600 max-w-none"
            />

            {/* Ratings and Reviews Section */}
            <div className="flex items-center gap-3 pt-2">
              <p className="text-lg font-bold text-orange-500">{ratingValue.toFixed(1)}</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={i < Math.floor(ratingValue) ? assets.star : assets.star_blank}
                    alt="star"
                    className="w-5 h-5"
                  />
                ))}
              </div>
              <p className="text-md text-gray-500">
                ({ratingCount} {ratingCount === 1 ? 'rating' : 'ratings'})
              </p>
            </div>

          </div>

          {/* --- Right Column: Purchase Card --- */}
          <div>
            
          </div>

        </div>
      </main>
    </div>
  );
}

export default CourseDetails;