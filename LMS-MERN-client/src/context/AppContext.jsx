import { createContext } from "react";
import { dummyCourses } from "../assets/assets";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();



export  const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY || '$';

    const [allCourses, setAllCourses] = React.useState([]);
    // fetch all courses
    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }    
    useEffect(() => {
        fetchAllCourses();
    }, []);

    const navigate = useNavigate();


    const value = {
        currency,allCourses,navigate
    }

    return (
        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>
    );
}
