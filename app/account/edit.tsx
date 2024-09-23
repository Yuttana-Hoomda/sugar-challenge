import React from 'react'
import { User, Weight, Ruler } from 'lucide-react';
import Image from 'next/image'
import BMI from '../images/BMI.svg'; // Path:

export default function Account() {
  return (
    <div>
        <h1 className="font-semibold text-[25px] text-center">ข้อมูลทั่วไป</h1>
        <div className="grid justify-center overflow-hidden gap-12 mt-3">
        <img
          className="inline-block h-32 w-32 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>

      {/* User info fieldes */}
      <div className="space-y-4">
          <div className="flex items-center p-3 rounded-xl mt-6 border border-indigo-950">
            <User className="text-gray-700 mr-3" />
            <input
              type="text"
              placeholder="ประณี ต่อยโละสาธุ"
              className="flex-1 outline-none"
            />
          </div>
          <div className="flex items-center bg-white p-3 rounded-lg border border-indigo-950">
            <User className="text-gray-700 mr-3" />
            <select className="flex-1 outline-none appearance-none bg-transparent">
              <option>หญิง</option>
              <option>ชาย</option>
            </select>
          </div>

          <div className="flex gap-5">
            <div className='flex border border-indigo-950 rounded-lg items-center bg-white p-3 '>
              <Weight className="text-gray-700 mr-3 " />
              <input type="text" placeholder="56" className="flex-1 outline-none" />
            </div>
            <span className="text-black font-medium rounded-lg items-center bg-sky-200 px-6 py-3 ">KG</span>
          </div>

          <div className="flex gap-5">
            <div className='flex border border-indigo-950 rounded-lg items-center bg-white p-3 '>
              <Ruler className="text-gray-700 mr-3 " />
              <input type="text" placeholder="165" className="flex-1 outline-none" />
            </div>
            <span className="text-black font-medium rounded-lg items-center bg-sky-200 px-6 py-3 ">CM</span>
          </div>

          <div className='flex text-white font-medium text-2xl rounded-lg bg-blue-500 bg-sky-700 px-24 py-3 whitespace-nowrap overflow-hidden gap-5 justify-center'>
            <Image src={BMI} alt="BMI" />
            <div className='mt-3'>
              คำนวณค่ามาตรฐาน
            </div>
          </div>

          <div className='flex text-white font-medium text-2xl rounded-lg bg-blue-500 bg-gray-300 px-24 whitespace-nowrap overflow-hidden gap-5 justify-center'>
          <div className='flex-center py-4'>
            {/* <CircularProcessBMI size={120} sugarValue={29.9}/> */}
          </div>
            <div className='text-4xl text-black mt-12 '>
              สมส่วน
            </div>
          </div>
          
          
        </div>


     
    </div>
  )
}

