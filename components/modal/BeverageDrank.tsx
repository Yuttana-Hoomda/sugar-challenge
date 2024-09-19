import React, { useEffect } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from 'next/image'

type props = {
    name: string,
    image: string,
    sugar: number,
    consume: string,
    level: string,
}

function BeverageDrank({ name, image, sugar, consume, level}: props) {
    return (
        <div className='grid grid-cols-2 gap-3 rounded-3xl border-2 border-blue shadow-lg w-[152px] h-[109px] mt-2 p-2'>
            <div>
              <Image src={image} alt='' width={45} height={40} className='col-span-1 object-cover ml-3 mb-2' />
              <h2 className='text-lg text-[#002D63] font-medium'>{name}</h2>
            </div>
            <div className='grid '>
              <div className='flex w-[61px] h-[23px] bg-[#EBF4FF] text-center rounded-xl justify-center p-1'>
                <RiDeleteBin6Line size={12} color='#E95322'/> 
                <h2 className='ml-2 text-[#002D63] text-[10px]'>{sugar} g</h2>
              </div>
              <div className='flex justify-center p-1 w-[61px] h-[23px] bg-[#EBF4FF] text-center rounded-xl'>
                <RiDeleteBin6Line size={12} color='#E95322'/> 
                <h2 className='ml-2 text-[#002D63] text-[10px]'>{consume} %</h2>
              </div>
                <h2 className='text-[#002D63] w-[61px] h-[23px] text-[10px] bg-[#EBF4FF] text-center p-1 rounded-xl'>{level}</h2>
            </div>
        </div>
    );
}

export default BeverageDrank