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
        <div className='grid grid-cols-2 gap-2 rounded-2xl border border-blue shadow-beverage p-2 w-[160px] h-[110px]'>
            <div className='flex flex-col justify-between items-center gap-2'>
              <Image src={image} alt='' width={40} height={40}/>
              <h2 className='text-lg text-darkBlue'>{name}</h2>
            </div>
            <div className='flex flex-col justify-between items-center'>
              <div className='flex justify-center items-center bg-lightBlue rounded-md gap-2 px-2 w-full'>
                <div className='bg-blue w-2 h-2 rounded-full'/>
                <h3 className='text-light text-darkBlue text-sm'>{sugar} g</h3>
              </div>
              <div className='flex justify-center items-center bg-lightBlue rounded-md gap-2 px-2 w-full'>
                <div className='bg-blue w-2 h-2 rounded-full'/>
                <h3 className='text-light text-darkBlue text-sm'>{consume}</h3>
              </div>
              <div className='flex justify-center items-center bg-lightBlue rounded-md w-full'>
                <h3 className='text-light text-darkBlue text-sm'>{level}</h3>
              </div>
            </div>
        </div>
    );
}

export default BeverageDrank