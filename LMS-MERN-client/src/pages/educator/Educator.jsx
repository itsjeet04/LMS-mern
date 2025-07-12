import React from 'react'
import { Outlet } from 'react-router-dom'

function Educator() {
  return (
    <>
    <div>Educator page</div>
    <div>
      <Outlet />
    </div>  
    </>
  )
}

export default Educator