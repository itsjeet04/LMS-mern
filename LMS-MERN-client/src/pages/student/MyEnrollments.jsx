import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import {Line } from "rc-progress"
import Footer from '../../components/student/Footer'


function MyEnrollments() {

  const { enrolledCourses, calcCourseTime, navigate} = useContext(AppContext)

  const [progressArray , setProgressArray ] = useState([
    {lectureCompleted : 2 , totalLectures : 4},
    {lectureCompleted : 4 , totalLectures : 4},
    {lectureCompleted : 6 , totalLectures : 7},
    {lectureCompleted : 1 , totalLectures : 5},
    {lectureCompleted : 6 , totalLectures : 6},
    {lectureCompleted : 8 , totalLectures : 9},
    {lectureCompleted : 9 , totalLectures : 10},
    {lectureCompleted : 5 , totalLectures : 8},
  ])

  return (
    <>
      <div className='p-4 sm:p-6 lg:p-8 w-full bg-gray-50 min-h-screen'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-800 mb-8'>
          My Enrollments
        </h1>
        <div className="relative overflow-x-auto shadow-lg sm:rounded-xl bg-white">
          <table className='w-full text-sm text-left text-gray-600'>
            <thead className='text-xs text-gray-500 uppercase bg-gray-50 font-medium'>
              <tr>
                <th scope="col" className="px-6 py-4 tracking-wider">Course</th>
                <th scope="col" className="px-6 py-4 tracking-wider">Duration</th>
                <th scope="col" className="px-6 py-4 tracking-wider">Progress</th>
                <th scope="col" className="px-6 py-4 tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {enrolledCourses.map((course, index) => {
                const progress = progressArray[index];
                const isCompleted = progress ? progress.lectureCompleted === progress.totalLectures : false;

                return (
                  <tr key={index} className='hover:bg-gray-50 transition-colors duration-150 align-middle'>
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-4'>
                        <img src={course.courseThumbnail} alt='thumbnail' className='w-28 h-16 object-cover rounded-lg' />
                        <div className="min-w-0 p-3 bg-white rounded-lg shadow flex flex-col">
  <p className="font-semibold text-gray-800 truncate text-base">{course.courseTitle}</p>
  <div className="mt-2">
    <Line
      className="rounded-full"
      strokeWidth={2}
      percent={
        progressArray[index]
          ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures
          : 0
      }
    />
  </div>
</div>

                      </div>
                    </td>
                    <td className='px-6 py-4 font-medium whitespace-nowrap'>{calcCourseTime(course)}</td>
                    <td className='px-6 py-4 font-medium'>
                      {progress ? (
                        <>
                          {`${progress.lectureCompleted} / ${progress.totalLectures}`}
                          <span className='text-xs text-gray-500 ml-1.5'>
                            lectures
                          </span>
                        </>
                      ) : (
                        <span className='text-gray-400'>--</span>
                      )}
                    </td>
                    <td className='px-6 py-4'>
                      {progress && (
                         <button
                           onClick={() => navigate('/player/' + course._id)}
                           className={`inline-block text-center px-4 py-1 text-xs font-semibold rounded-full transition-colors duration-200 whitespace-nowrap ${
                             isCompleted
                               ? 'bg-green-100 text-green-700 hover:bg-green-200'
                               : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                           }`}
                         >
                           {isCompleted ? 'Completed' : 'On Going'}
                         </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MyEnrollments