import React from 'react'
import { assets } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';

function Navbar() {
    const { user, isSignedIn } = useUser();

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md">

            <div>
                <Link to="/" className="flex items-center">
                    <img src={assets.logo} alt='logo' className='h-10 w-auto' />
                </Link>
            </div>


            <div className="flex items-center gap-4">
                {isSignedIn ? (
                    <>
                        <p className="text-gray-800 font-semibold hidden sm:block bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                            👋 Hey, <span className="text-blue-600">{user?.fullName || "Guest"}</span>
                        </p>
                        <div className="ml-2">
                            <UserButton afterSignOutUrl="/" />
                        </div>
                    </>

                ) : (
                    <Link to="/sign-in">
                        <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors">
                            Login
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar;