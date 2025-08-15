import React from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import Home from './pages/student/Home.jsx';
import CoursesList from './pages/student/CoursesList.jsx';
import CourseDetails from './pages/student/CourseDetails.jsx';
import MyEnrollments from './pages/student/MyEnrollments.jsx';
import Player from './pages/student/Player.jsx';
import Loading from './components/student/Loading.jsx';
import Educator from './pages/educator/Educator.jsx';
import AddCourse from './pages/educator/AddCourse.jsx';
import Dashboard from './pages/educator/Dashboard.jsx';
import MyCourse from './pages/educator/MyCourse.jsx';
import StudentEnrolled from './pages/educator/StudentEnrolled.jsx';
import Navbar from './components/student/Navbar.jsx';

function App() {

  const isEducatorRoute = useMatch('/educator/*');
  return (  
    <div className='text-gray-800 bg-gray-50 min-h-screen'>
      { /*{ Navbar for student} */}
      {!isEducatorRoute && <Navbar/>}
      
      <Routes>
        // student routes
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />

        //educator routes
        <Route path="/educator" element={<Educator />}>
          <Route path="/educator" element={<Dashboard />} />
          <Route path="my-courses" element={<MyCourse/>} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="students-enrolled" element={<StudentEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;