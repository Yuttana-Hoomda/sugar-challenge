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
      className='w-[160px] h-[160px] border-blue border rounded-xl bg-white flex flex-col justify-evenly items-center shadow-beverage'
      onClick={link}
    >
      <Image src={img} alt='' width={imgSize} height={imgSize} />
      <h2 className='text-darkBlue font-medium text-lg'>{menu}</h2>
    </div>
  )
}

export default BeverageCard