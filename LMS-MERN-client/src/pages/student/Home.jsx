import React from 'react'
import Hero from '../../components/student/Hero'
import SearchBar from '../../components/student/SearchBar'
function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 min-h-screen px-4 bg-gray-50">
  <Hero />
  <SearchBar />
</div>

  )
}

export  default Home