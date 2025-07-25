import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

function CourseDetails() {

  const {id} = useParams()

  const [courseData, setCourseData] = useState(null)  

  const {allCourses} = useContext(AppContext)

  const fetchCourseData = async () => {
    const course = allCourses.find(course => course._id === id);
    setCourseData(course);
  }

  useEffect(()=>{
    fetchCourseData()
  }, [id, allCourses])


  return courseData ?(
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left '>

      <div className='absolite top-0 left-0 w-fullh-secition-height -z-1 bg-gradient-to-b from-cyan-100/70'></div>



      {/* left column */} 
      <div>
        <h1>
          {courseData.courseTitle}
        </h1>
        <p>
          {courseData.courseDescription}
        </p>
      <div>
      
      {/* right column */}
      </div>
      <div>

      </div>
    </div>
    </div>
  ) : <Loading />
}

export default CourseDetails