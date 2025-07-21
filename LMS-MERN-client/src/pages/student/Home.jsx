import React from 'react'
import Hero from '../../components/student/Hero'
import SearchBar from '../../components/student/SearchBar' 
import CoursesSection from '../../components/student/CoursesSection'
import TestimonialsSection from '../../components/student/TestimonialsSection'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/Footer'
function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 min-h-screen px-4 bg-gray-50">
  <Hero />
  <SearchBar />
  <CoursesSection/>
  <TestimonialsSection/>
  <CallToAction />
  <Footer />
</div>

  )
}

export  default Home