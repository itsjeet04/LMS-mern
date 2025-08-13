import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import Footer from '../../components/student/Footer'
import Rating from '../../components/student/Rating'

function Player() {


  

    const  {enrolledCourses , calcChapterTime  } = useContext(AppContext)
    const { courseId } = useParams(); 


    const [courseData , setCourseData ] = useState(null)
    const [openSections , setOpenSections ] = useState({})
    const [playerData , setPlayerData ] = useState(null)


      // console.log("enrolledCourse:", enrolledCourses); 
      // console.log("courseId:", courseId);

const getCourseData = () => {
  if (!enrolledCourses) return; 


  const foundCourse = enrolledCourses.find(course => course._id === courseId);
  if (foundCourse) setCourseData(foundCourse);
};


    useEffect(()=>{
      getCourseData()
      },[enrolledCourses, courseId])

       const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
return (
  <>
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* left column */}
      <div className="lg:w-1/3 w-full p-4 bg-white border-r border-gray-200 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Structure</h2>

        <div className="space-y-3 border border-gray-200 rounded-xl p-3 bg-gray-50">
          {courseData && courseData.courseContent.map((chapter, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm"
            >
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

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openSections[index] ? 'max-h-[1000px]' : 'max-h-0'
                }`}
              >
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <ul className="space-y-3">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-100 transition"
                      >
                        <img
                          src={false ? assets.blue_tick_icon : assets.play_icon}
                          alt="play-icon"
                          className="w-5 h-5 mt-1 text-gray-500"
                        />
                     <div className="flex-1">
  {/* Lecture Title */}
  <p className="font-medium text-gray-800">{lecture.lectureTitle}</p>

  {/* Lecture Actions & Duration */}
  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
    {lecture.lectureUrl && (
      <button
        onClick={() =>
          setPlayerData({
            ...lecture,
            chapter: index + 1,
            lecture: i + 1,
          })
        }
        className="text-green-600 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-green-500 rounded"
      >
        Watch
      </button>
    )}

    {/* Duration */}
    <span className="text-gray-600">
      {humanizeDuration(lecture.lectureDuration * 60 * 1000, {
        round: true,
        units: ['h', 'm'],
      })}
    </span>
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
     <div className="mt-6 mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-200">
  {/* <h1 className="text-xl font-semibold text-gray-800">
    Rate the course:
  </h1> */}
  <h1 className="text-xl font-semibold text-gray-800 mb-4">
    Rate the course:
  </h1>
  <Rating initialRating={0}/>
</div>

      </div>

{/* right column */}
<div className="flex-1 p-6">
  {playerData ? (
    <div className="space-y-4">
      <div className="aspect-video w-full rounded-lg overflow-hidden shadow-md border border-gray-300">
        <YouTube
          videoId={playerData.lectureUrl.split('/').pop()}
          iframeClassName="w-full "
        />
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-800">
          {playerData.chapter}.{playerData.lecture} - {playerData.lectureTitle}
        </p>
      </div>
      <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition shadow-md">
        Mark as Completed
      </button>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <img
        src={courseData ? courseData.courseThumbnail : ''}
        alt="Course Thumbnail"
        className="rounded-lg shadow-md max-h-[500px] object-contain"
      />
    </div>
  )}
</div>
    </div>

    <Footer/>
  </>
)

}

export default Player