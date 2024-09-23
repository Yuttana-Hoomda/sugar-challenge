'use client'
import React, { useEffect, useState } from 'react'
import { FaCircleInfo } from "react-icons/fa6";
import CircularProgress from '@/components/CircularProgress';
import BeverageDrank from '@/components/modal/BeverageDrank';

type Beverage = {
  menu: string;
  img: string;
  value: number;
  quantities: string;
  sweetLevel: string;
}

type User = {
  currentSugar: number;
  beverageHistory: Beverage[];
}

const HomePage = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const userName = 'John Doe';

  // const getUserData = async () => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/api/user/${userName}`, {
  //       method: 'GET'
  //     });

  //     if (response.ok) {
  //       const data = await response.json(); 
  //       setUserData(data);
  //     } else {
  //       console.error('Failed to fetch data, response status:', response.status);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // };

  // useEffect(() => {
  //   getUserData();
  // }, []);

  return (
    <div>
      <div className='border-blue border bg-lightBlue rounded-xl py-2 px-4'>
        <div className='flex items-center justify-between'>
          <h1 className='font-semibold text-2xl text-darkBlue'>ปริมาณน้ำตาล</h1>
          <FaCircleInfo size={20} color='#4F80C0' />
        </div>
        <div className='flex-center py-4'>
          <CircularProgress size={165} sugarValue={userData?.currentSugar ?? 0} />
        </div>
      </div>

      <div className='space-y-5 mt-12'>
        <h3 className='font-semibold text-2xl mt-2 text-[#002D63]'>ล่าสุด</h3>
        <div className='grid grid-cols-2 justify-items-center items-center gap-5'>
        {userData ? (
            userData.beverageHistory.length > 0 ? (
              userData.beverageHistory.map((item, index) => (
                <BeverageDrank 
                  key={index} 
                  name={item.menu} 
                  image={item.img} 
                  sugar={item.value} 
                  consume={item.quantities} 
                  level={item.sweetLevel} 
                />
              ))
            ) : (
              <p>No beverage history available.</p>
            )
          ) : (
            'Loading...'
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage;
