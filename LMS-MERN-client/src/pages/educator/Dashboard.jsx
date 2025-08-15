import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/student/Loading';

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const { currency } = useContext(AppContext);

  const fetchDashboardData = async () => {
    setTimeout(() => {
      setDashboardData(dummyDashboardData);
    }, 500);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return dashboardData ? (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-5 hover:shadow-lg transition-shadow duration-300">
            <img className="h-12 w-12" src={assets.patients_icon} alt="Enrolled Students Icon" />
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className="text-sm font-medium text-gray-500">
                Enrolled Students
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-5 hover:shadow-lg transition-shadow duration-300">
            <img className="h-12 w-12" src={assets.appointments_icon} alt="Total Courses Icon" />
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {dashboardData.totalCourses}
              </p>
              <p className="text-sm font-medium text-gray-500">
                Total Courses
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-5 hover:shadow-lg transition-shadow duration-300">
            <img className="h-12 w-12" src={assets.earning_icon} alt="Total Earnings Icon" />
            <div>
              <p className="text-3xl font-bold text-gray-900">
                <span className='text-2xl align-top mr-1'>{currency}</span>
                {dashboardData.totalEarnings}
              </p>
              <p className="text-sm font-medium text-gray-500">
                Total Earnings
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Enrollments</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 px-6">#</th>
                  <th scope="col" className="py-3 px-6">Student Name</th>
                  <th scope="col" className="py-3 px-6">Course Name</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.enrolledStudentsData.slice(0, 5).map((item, index) => (
                  <tr key={index} className="bg-white border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{index + 1}</td>
                    <td className="py-4 px-6">{item.student.name}</td>
                    <td className="py-4 px-6">{item.courseTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <Loading />
    </div>
  );
}

export default Dashboard;