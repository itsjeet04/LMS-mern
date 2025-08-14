import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'

function Educator() {
  return (
    <div className="min-h-screen bg-slate-100">
      

      <Navbar />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>

    </div>
  )
}

export default Educator 