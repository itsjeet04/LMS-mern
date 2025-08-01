import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import Loading from '../../components/student/Loading';
import humanizeDuration from 'humanize-duration'

function CourseDetails() {
  const { id } = useParams();
  const { allCourses, calcCourseRating, calcNumberOfLectures, calcCourseTime, calcChapterTime } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const [openSections,setOpenSections] = useState({});

  useEffect(() => {
    // Finds the course from the context based on the URL parameter.
    const course = allCourses.find(c => c._id === id);
    // If course is found, set it to state.
    setCourseData(course);
  }, [id, allCourses]); // Re-run effect if id or course list changes

  // Display a loading spinner until the course data is available
  if (!courseData) {
    return <Loading />;
  }

  const toggleSection = (index) => {
    setOpenSections((prev)=>(
      {
      ...prev,[index] : !prev[index],
    }
  ))
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
              <p>
                {courseData.enrolledStudents.length}  {courseData.enrolledStudents.length > 1 ? 'students enrolled' : 'student enrolled'}
              </p>
            </div>
            <p>
              Course by :
              <span className='underline text-blue-600'>
                Sirjanjeet singh
              </span>
            </p>

{/* Course Structure */}

<h2 className='text-2xl font-semibold text-gray-800 mt-10 mb-4'>
  Course Structure
</h2>
<div className="space-y-6">
  {courseData.courseContent.map((chapter, index) => (
    <div key={index} className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <button
  type="button"
  onClick={() => toggleSection(index)}
  aria-expanded={!!openSections[index]}
  className="w-full flex items-center gap-3 mb-2 focus:outline-none"
>
  <img
    src={assets.down_arrow_icon}
    alt={openSections[index] ? 'Collapse' : 'Expand'}
    className={`w-5 h-5 transition-transform ${
      openSections[index] ? 'rotate-180' : 'rotate-0'
    }`}
  />
  <div className="flex-1 text-left">
    <p className="text-lg font-medium text-gray-800">
      {chapter.chapterTitle}
    </p>
    <p className="text-sm text-gray-500">
      {chapter.chapterContent.length} lectures • {calcChapterTime(chapter)}
    </p>
  </div>
</button>

      <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96' : 'max-h-0' }`}  >
      <ul className="space-y-3">
        {chapter.chapterContent.map((lecture, i) => (
          <li
            key={i}
            className="flex items-start gap-3 bg-gray-50 hover:bg-gray-100 p-3 rounded-lg border border-gray-100 transition"
          >
            <img src={assets.play_icon} alt="play-icon" className="w-5 h-5 mt-1" />
            <div className="flex-1">
              <p className="font-medium text-gray-700">{lecture.lectureTitle}</p>
              <div className="flex gap-3 text-sm text-gray-500">
                {lecture.isPreviewFree && (
                  <p className="text-green-600 font-semibold">Preview</p>
                )}
                <p>
                  {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                    units: ['h', 'm', 's']
                  })}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  ))}

  {/*  */}
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