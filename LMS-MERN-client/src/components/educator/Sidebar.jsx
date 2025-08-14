import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { NavLink } from 'react-router-dom';

function Sidebar() {
    const { isEducator } = useContext(AppContext);

    const menuItems = [
        { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
        { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
        { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
        { name: 'Students Enrolled', path: '/educator/students-enrolled', icon: assets.person_tick_icon },
    ];

    const baseLinkClasses = "flex items-center p-3 rounded-lg transition-colors duration-200 ease-in-out";
    const activeLinkClasses = "bg-blue-600 text-white font-semibold";
    const inactiveLinkClasses = "text-gray-400 hover:bg-gray-700 hover:text-white";

    return isEducator && (
        <div className="hidden md:flex flex-col w-64 bg-gray-900 text-blue-100 h-screen p-4 space-y-2 border-r border-gray-700">
            {menuItems.map((item) => (
                <NavLink
                    to={item.path}
                    key={item.name}
                    end={item.path === '/educator'}
                    className={({ isActive }) =>
                        `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                    }
                >
                    <img src={item.icon} alt={`${item.name} icon`} className="w-6 h-6 mr-4 shrink-0" />
                    <p className="text-sm font-medium">{item.name}</p>
                </NavLink>
            ))}
        </div>
    );
}

export default Sidebar;