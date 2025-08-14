import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import Sidebar from '../../components/educator/Sidebar'

function Educator() {
  return (
    <div className="min-h-screen bg-slate-100">
      

      <Navbar />


      <main className="flex">
        <Sidebar/>
        <div className='flex-1 border-l border-gray-300'>
        {<Outlet />}
        </div>
      </main>

    </div>
  )
}

export default Educator 