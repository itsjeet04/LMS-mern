import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Loading() {

  const {path} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    if(path){
    const timer = setTimeout (() => {
      navigate(`/${path}`);
    }, 5000)
    return () => clearTimeout(timer);
  }
  },[])


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm">
      <div className="flex flex-col items-center">

        <div
          className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Loading...</span>
        </div>

        <p className="mt-4 text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    </div>
  );
}


export default Loading;
// loading 
