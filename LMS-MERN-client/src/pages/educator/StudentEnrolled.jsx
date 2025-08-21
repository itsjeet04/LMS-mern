import React, { useEffect, useState } from 'react';
import { dummyStudentEnrolled } from '../../assets/assets';
import Loading from '../../components/student/Loading';

function StudentEnrolled() {
  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  if (!enrolledStudents) {
    return <Loading />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Enrolled Students</h2>
        <p className="text-gray-500 mt-1">View and manage all students enrolled in your courses.</p>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full w-full">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Student Name</th>
              <th className="py-3 px-6 text-left">Course Title</th>
              <th className="py-3 px-6 text-left">Date of Purchase</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {enrolledStudents.length > 0 ? (
              enrolledStudents.map((enrollment) => (
                <tr key={enrollment.student._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <img
                        className="w-10 h-10 rounded-full object-cover mr-4 border-2 border-gray-200"
                        src={enrollment.student.imageUrl}
                        alt={enrollment.student.name}
                      />
                      <span className="font-medium">{enrollment.student.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>{enrollment.courseTitle}</span>
                  </td>
                  <td className="py-3 px-6 text-left">
                    <span>
                      {new Date(enrollment.purchaseDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-10 text-gray-500">
                  No students have enrolled yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentEnrolled;