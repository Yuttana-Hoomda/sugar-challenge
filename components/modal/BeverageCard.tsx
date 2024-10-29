'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import AddBeverageModal from './AddBeverageModal';

interface BeverageCardProps {
  menu: string,
  img: string,
  imgSize: number
  link: () => void
}

const BeverageCard: React.FC<BeverageCardProps> = ({ menu, img, imgSize, link }) => {

  return (
    <div
      className='w-[150px] h-[150px] border-blue border rounded-xl bg-white flex justify-center items-center shadow-beverage'
      onClick={link}
    >
      <div className='flex flex-col justify-center items-center gap-2'>
        <Image src={img} alt='' width={imgSize} height={imgSize} />
        <h2 className='text-darkBlue font-medium text-lg'>{menu}</h2>
      </div>
    </div>
  )
}

export default BeverageCard