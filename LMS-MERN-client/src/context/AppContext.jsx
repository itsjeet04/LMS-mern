import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import humanizeDuration from "humanize-duration";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isEducator, setIsEducator] = useState(false);

  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();

  const navigate = useNavigate();

  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/course/all-courses");
      if (data?.success) {
        setAllCourses(data.courses);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(
        backendUrl + "api/user/enrolled-courses",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data?.success) {
        setEnrolledCourses(data.enrolledCourses.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      if (!user) return;

      if (user.publicMetadata.role === "educator") {
        setIsEducator(true);
      }

      const token = await getToken();
      const { data } = await axios.get(backendUrl + "api/user/data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data?.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const calcCourseRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) return 0;
    let totalRating = 0;
    course.courseRatings.forEach((rating) => {
      totalRating += rating.rating;
    });
    return Math.floor(totalRating / course.courseRatings.length);
  };

  const calcChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.forEach((lecture) => {
      time += lecture.lectureDuration;
    });
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m", "s"] });
  };

  const calcCourseTime = (course) => {
    let time = 0;
    course.courseContent.forEach((chapter) => {
      chapter.chapterContent.forEach((lecture) => {
        time += lecture.lectureDuration;
      });
    });
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m", "s"] });
  };

  const calcNumberOfLectures = (course) => {
    let totalLectures = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        totalLectures += chapter.chapterContent.length;
      }
    });
    return totalLectures;
  };

  useEffect(() => {
    fetchAllCourses();
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      if (user) {
        const token = await getToken();
        console.log(token);
      }
    };
    fetchToken();
  }, [user]);

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchUserData();
    fetchEnrolledCourses();
  }, [user, isLoaded]);

  const value = {
    currency,
    backendUrl,
    navigate,

    allCourses,
    fetchAllCourses,

    enrolledCourses,
    fetchEnrolledCourses,

    userData,
    setUserData,

    isEducator,
    setIsEducator,

    calcCourseRating,
    calcChapterTime,
    calcCourseTime,
    calcNumberOfLectures,

    getToken,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
