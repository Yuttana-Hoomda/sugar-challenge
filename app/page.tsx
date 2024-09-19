import React from 'react'
import { FaCircleInfo } from "react-icons/fa6";
import Calender from "./calendar/page";
import CircularProgress from '@/components/CircularProgress';
import BeverageDrank from '@/components/modal/BeverageDrank';

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
          <h3 className='font-semibold text-2xl mt-2 text-[#002D63]'>ล่าสุด</h3>
          <div>
            <BeverageDrank name={'น้ำผลไม้'} image={'/images/juice.svg'} sugar={12} consume={'50'} level={'หวานมาก'}/>
          </div>
        </div>
    </div>
  )
}

export default Home
