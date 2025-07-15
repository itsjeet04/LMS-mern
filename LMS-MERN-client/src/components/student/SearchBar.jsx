import React from 'react';
import { assets } from "../../assets/assets";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SearchBar({data}) {

  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const onSearchHandle = (e) => {
    e.preventDefault();
    navigate(`/course-list/${input}`);
  };

  return (
    <form  onSubmit={onSearchHandle}  className="flex items-center w-full max-w-xl mx-auto bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <div className="pl-3">
        <img src={assets.search_icon} alt="search_icon" className="w-5 h-5" />
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Search for courses"
        className="flex-grow px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-medium hover:bg-blue-600 transition duration-200"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
