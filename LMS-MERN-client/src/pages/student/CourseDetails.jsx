import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import Loading from '../../components/student/Loading';
import humanizeDuration from 'humanize-duration';

function CourseDetails() {
  const { id } = useParams();
  const { allCourses, calcCourseRating, calcNumberOfLectures, calcCourseTime, calcChapterTime, currency } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    // Finds the course from the context based on the URL parameter.
    const course = allCourses.find(c => c._id === id);
    // If course is found, set it to state.
    if (course) {
      setCourseData(course);
      // Pre-open the first chapter by default
      setOpenSections({ 0: true });
    }
  }, [id, allCourses]); // Re-run effect if id or course list changes

  // Display a loading spinner until the course data is available
  if (!courseData) {
    return <Loading />;
  }

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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

            {/* Short Description with "Read More" functionality */}
            <div className="prose prose-lg text-gray-600 max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: isDescriptionExpanded
                    ? courseData.courseDescription
                    : `${courseData.courseDescription.slice(0, 200)}...`
                }}
              />
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="text-blue-600 hover:underline font-semibold mt-2"
              >
                {isDescriptionExpanded ? 'Read less' : 'Read more'}
              </button>
            </div>


            {/* Ratings and Reviews Section */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2">
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
              <p className="text-md text-gray-600">
                {courseData.enrolledStudents.length} {courseData.enrolledStudents.length === 1 ? 'student' : 'students'}
              </p>
            </div>
            <p className="text-gray-700">
              Created by:
              <span className='font-semibold text-blue-600 ml-2'>
                Sirjanjeet Singh
              </span>
            </p>

            {/* --- Course Structure Accordion --- */}
            <div className="pt-8">
              <h2 className='text-3xl font-bold text-gray-800 mb-6'>
                Course Content
              </h2>
              <div className="space-y-3 border border-gray-200 rounded-xl p-3">
                {courseData.courseContent.map((chapter, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                    <button
                      type="button"
                      onClick={() => toggleSection(index)}
                      aria-expanded={!!openSections[index]}
                      className="w-full flex items-center justify-between gap-3 p-4 focus:outline-none focus:bg-gray-100 transition"
                    >
                      <div className="flex-1 text-left">
                        <p className="text-lg font-semibold text-gray-800">
                          {chapter.chapterTitle}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {chapter.chapterContent.length} lectures • {calcChapterTime(chapter)}
                        </p>
                      </div>
                      <img
                        src={assets.down_arrow_icon}
                        alt={openSections[index] ? 'Collapse' : 'Expand'}
                        className={`w-5 h-5 transition-transform duration-300 ${openSections[index] ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openSections[index] ? 'max-h-[1000px]' : 'max-h-0'}`}>
                      <div className="p-4 border-t border-gray-200">
                        <ul className="space-y-3">
                          {chapter.chapterContent.map((lecture, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50 transition"
                            >
                              <img src={assets.play_icon} alt="play-icon" className="w-5 h-5 mt-1 text-gray-500" />
                              <div className="flex-1">
                                <p className="font-medium text-gray-700">{lecture.lectureTitle}</p>
                                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                                  {lecture.isPreviewFree && (
                                    <p className="text-green-600 font-semibold flex items-center gap-1">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                      Preview
                                    </p>
                                  )}
                                  <p>
                                    {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
                                      round: true,
                                      units: ['h', 'm'],
                                    })}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Description
              </h2>
              <div
                dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
                className="prose prose-lg text-gray-600 max-w-none"
              />
            </div>

          </div>

          {/* --- Right Column: Purchase Card --- */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-sm">
            <img
              src={courseData.courseThumbnail}
              alt="course"
              className="w-full h-48 object-cover"
            />

            <div className="p-5 flex items-center gap-2 bg-gray-50">
              <img
                src={assets.time_left_clock_icon}
                alt="time left"
                className="w-5 h-5"
              />
              <span className="text-sm font-medium text-gray-700">
                5 days&nbsp;
              </span>
              <span className="text-sm text-gray-500">left at this price!</span>
            </div>

            <div className="p-5 space-y-1">
              <p className="text-2xl font-bold text-green-300">
                {currency}
                {(courseData.coursePrice - courseData.discount * courseData.coursePrice / 100).toFixed(2)}
              </p>
              <p className="text-sm text-gray-400 line-through">
                {currency}
                {courseData.coursePrice.toFixed(2)}
              </p>
              <p className="text-sm font-semibold text-red-500">
                {courseData.discount}% off
              </p>
            </div>

<div className="flex items-center gap-4 flex-wrap">
  {/* Rating */}
  <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm">
    <img src={assets.star} alt="star" className="w-4 h-4" />
    <span className="text-sm font-semibold text-gray-900">
      {calcCourseRating(courseData)}
    </span>
    <span className="text-xs text-gray-500">average</span>
  </div>

  <div className="h-4 w-px bg-gray-500/40" />

  {/* Time */}
  <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm">
    <img src={assets.time_clock_icon} alt="clock" className="w-4 h-4" />
    <span className="text-sm font-semibold text-gray-900">
      {calcCourseTime(courseData)}
    </span>
  </div>

  <div className="h-4 w-px bg-gray-500/40" />

  {/* Lessons */}
  <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1 shadow-sm">
    <img src={assets.lesson_icon} alt="lesson" className="w-4 h-4" />
    <span className="text-sm font-semibold text-gray-900">
      {calcNumberOfLectures(courseData)} lessons
    </span>
  </div>
</div>
</div>
</div>


      </main>
    </div>
  );
}

export default CourseDetails;
