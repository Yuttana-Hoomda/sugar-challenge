import React from 'react'
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className='flex items-center justify-between px-5 border-b-2'>
        <h1 className='font-bold text-4xl text-blue'>LOGO</h1>
        <div className='flex items-center gap-2'>
            <h4 className='font-light text-blue text-sm'>userName</h4>
            <FaUserCircle size={25} color='#4F80C0'/>
        </div>
    </div>
  )
}

export default Header