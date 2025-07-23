import React, { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
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


  return (
    <div>
      <div>
      {/* left column */}
      <div>

      </div>
      {/* right column */}
      <div>

      </div>
    </div>
    </div>
  )
}

export default CourseDetails