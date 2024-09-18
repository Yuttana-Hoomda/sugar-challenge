import React from 'react'
import { FaCircleInfo } from "react-icons/fa6";
import Calender from "./calendar/page";
import CircularProgress from '@/components/CircularProgress';

const Home = () => {
  return (
    <div>
        <div className='border-blue border bg-lightBlue rounded-xl py-2 px-4'>
          <div className='flex items-center justify-between'>
            <h1 className='font-semibold text-xl text-darkBlue'>ปริมาณน้ำตาล</h1>
            <FaCircleInfo size={20} color='#4F80C0'/>
          </div>
          <div className='flex-center py-4'>
            <CircularProgress size={165} sugarValue={5}/>
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
