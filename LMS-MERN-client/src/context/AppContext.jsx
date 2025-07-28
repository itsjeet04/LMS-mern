import { createContext } from "react";
import { dummyCourses } from "../assets/assets";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    const currency = import.meta.env.VITE_CURRENCY || '$';
    const [allCourses, setAllCourses] = React.useState([]);

    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses);
    };

    useEffect(() => {
        fetchAllCourses();
    }, []);

    const navigate = useNavigate();
    const [isEducator, setIsEducator] = React.useState(true);

    const calcCourseRating = (course) => {
        if (!course.courseRatings || course.courseRatings.length === 0) return 0;
        let totalRating = 0;
        course.courseRatings.forEach((rating) => {
            totalRating += rating.rating;
        });
        return totalRating / course.courseRatings.length;
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
        course.courseContent.forEach(chapter => {
            if (Array.isArray(chapter.chapterContent)) {
                totalLectures += chapter.chapterContent.length;
            }
        });
        return totalLectures;
    };

    const value = {
        currency,
        allCourses,
        navigate,
        calcCourseRating,
        isEducator,
        setIsEducator,
        calcNumberOfLectures,
        calcCourseTime,
        calcChapterTime
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
