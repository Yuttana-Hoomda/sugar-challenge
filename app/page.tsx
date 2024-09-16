import React from 'react'
import { FaCircleInfo } from "react-icons/fa6";

const Home = () => {
  return (
    <div className='p-5'>
        <div className='border-blue border bg-lightBlue rounded-xl'>
          <div className='flex items-center justify-between'>
            <h1 className='font-semibold text-[26px]'>ปริมาณน้ำตาล</h1>
            <FaCircleInfo size={20} color='#4F80C0'/>
          </div>
        </div>

        <div>
          <h3 className='font-semibold text-lg'>ล่าสุด</h3>
          <div>

          </div>
        </div>
    </div>
  )
}

export default Home
