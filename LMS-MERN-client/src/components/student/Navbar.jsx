import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";



function Navbar() {
  const location = useLocation();
  const iscourseListPage = location.pathname.includes('/course-list'); // Check if the current path is the course list page

  const { openSignIn } = useClerk();
  const { user } = useUser();
  const {navigate} = useContext(AppContext)



  return (


    <header
      className={`w-full flex items-center justify-between px-6 py-4  shadow-md ${iscourseListPage ? "bg-white" : "bg-cyan-100/70"
        }`}

    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        
        <img onClick={()=>navigate("/")} src={assets.logo} alt="Logo" className="h-10 w-auto" />
        
        <span className="text-xl font-semibold text-gray-800">YourBrand</span>
      </div>

      {/* Actions */}
      <nav className="flex items-center gap-6">
        {user && <>
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
            Become Educator
          </button>
          
        <Link
          to="/my-enrollments"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          My Enrollments
        </Link>
        </>
        }
      </nav>

      {/* Auth */}
      <div>
        {user ? <UserButton /> : <button onClick={() => openSignIn()} className="px-4 py-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
          Create Account
        </button>}
      </div>

    </header>
  );
}

export default Navbar;
