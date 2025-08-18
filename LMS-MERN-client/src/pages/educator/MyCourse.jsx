import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/student/Loading';

function MyCourse() {
  const { currency, allCourses } = useContext(AppContext);
  
  
  const [courses, setCourses] = useState();

  const fetchEducatorCourses = async () => {
    setCourses(allCourses);
  };

  
  useEffect(() => {
    fetchEducatorCourses();
  }, []);

  return courses ? (
    <div>
      <div>
        <h2>My Courses</h2>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <td>All Courses</td>
              <td>Earnings</td>
              <td>Students</td>
              <td>Published on</td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default MyCourse;
