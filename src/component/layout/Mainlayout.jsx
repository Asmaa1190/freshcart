import React from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'

export default function Mainlayout() {
  return (
    <div >
<Navbar/>
<div className='py-1'>
<Outlet/>
</div>

<Footer/>
    </div>
  )
}
