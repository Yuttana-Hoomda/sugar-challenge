'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import AddBeverageModal from './AddBeverageModal';

interface BeverageCardProps {
  menu: string,
  img: string,
  imgSize: number
  sugarValue:number
  volume: number
}

const BeverageCard: React.FC<BeverageCardProps> = ({ menu, img, imgSize, sugarValue, volume}) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <div>
      <AddBeverageModal menu={menu} img={img} handleOpen={isOpen} handleClose={handleClose} sugarValue={sugarValue} volume={volume}/>
      <div
        className='w-[150px] h-[150px] border-blue border rounded-xl bg-white flex justify-center items-center relative shadow-beverage'
        onClick={handleOpen}
      >
        <FaCirclePlus color='4F80C0' size={25} className='absolute top-2 right-2' />
        <div className='flex flex-col justify-center items-center gap-2'>
          <Image src={img} alt='' width={imgSize} height={imgSize}/>
          <div className='flex flex-col justify-items-center items-center'>
            <h2 className='text-darkBlue font-medium text-lg'>{menu}</h2>
            <a className='text-gray-500 text-sm font-light'>{volume} ml</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeverageCard