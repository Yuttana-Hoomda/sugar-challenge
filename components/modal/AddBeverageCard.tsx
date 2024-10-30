'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import AddBeverageModal from './AddBeverageModal';

interface BeverageCardProps {
  menu: string,
  img: string,
  imgSize: number,
  sugarValue: number,
  volume: number,
  sweetSelect: boolean
}

const BeverageCard: React.FC<BeverageCardProps> = ({ menu, img, imgSize, sugarValue, volume, sweetSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <AddBeverageModal 
        menu={menu} 
        img={img} 
        handleOpen={isOpen} 
        handleClose={handleClose} 
        sugarValue={sugarValue} 
        volume={volume} 
        sweetSelect={sweetSelect}
      />
      <div
        className='w-[160px] h-[160px] border-blue border rounded-xl bg-white flex flex-col justify-evenly items-center relative shadow-beverage'
        onClick={handleOpen}
      >
        <FaCirclePlus color='4F80C0' size={25} className='absolute top-2 right-2' />
        <Image src={img} alt='' width={imgSize} height={imgSize} />

        <h2 className='text-darkBlue font-medium text-lg truncate max-w-[140px]'>{menu}</h2>
        <a className='text-gray-500 text-sm'>{volume} ml</a>

      </div>
    </div>
  )
}

export default BeverageCard