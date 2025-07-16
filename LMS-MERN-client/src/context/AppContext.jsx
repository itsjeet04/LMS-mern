import { createContext } from "react";
import { dummyCourses } from "../assets/assets";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();



export  const AppContextProvider = (props) => {
    // currency 
    const currency = import.meta.env.VITE_CURRENCY || '$';

    // 1- state to hold all courses
    const [allCourses, setAllCourses] = React.useState([]);
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }    
    // 2- useEffect to fetch all courses when component mounts
    useEffect(() => {
        fetchAllCourses();
    }, []);

    // useNavigate hook
    const navigate = useNavigate();

    // function to calc course rating
    const calcCourseRating = (course) => 
        {
            if (!course.courseRatings || course.courseRatings.length === 0) return 0;
            let totalRating = 0;
            course.courseRatings.forEach((rating) => {
                totalRating += rating.rating;
            }
            );
            return totalRating / course.courseRatings.length;
    }



    const value = {
        currency,allCourses,navigate,calcCourseRating
    }

    return (
        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
    );
}
