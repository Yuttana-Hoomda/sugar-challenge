'use client'
import React, { useEffect, useState } from 'react'
import { FaCircleInfo } from "react-icons/fa6";
import CircularProgress from '@/components/CircularProgress';
import BeverageDrank from '@/components/modal/BeverageDrank';
import { useManageCookies } from '@/hooks/useManageCookies';

const HomePage = () => {
  const {
    sugarValue,
    beverageHistory
  } = useManageCookies();

  return (
    <div>
      <div className='border-blue border bg-lightBlue rounded-xl py-2 px-4'>
        <div className='flex items-center justify-between'>
          <h1 className='font-semibold text-2xl text-darkBlue'>ปริมาณน้ำตาล</h1>
          <FaCircleInfo size={20} color='#4F80C0' />
        </div>
        <div className='flex-center py-4'>
          <CircularProgress size={165} sugarValue={sugarValue} />
        </div>
      </div>

      <div className='space-y-5 mt-12'>
        <h3 className='font-semibold text-2xl mt-2 text-[#002D63]'>ล่าสุด</h3>
        <div className='grid grid-cols-2 justify-items-center items-center gap-5'>
          {beverageHistory.map((item, index) => (
            <div key={index}>
              <BeverageDrank 
                name={item.menu} 
                image={item.img} 
                sugar={item.value} 
                consume={item.quantities} 
                level={item.sweetLevel}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage;
