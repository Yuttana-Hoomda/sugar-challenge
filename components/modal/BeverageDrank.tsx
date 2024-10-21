import React, { useEffect } from 'react'
import BeverageIcon from '@/public/icons/beverageIcon.svg';
import Image from 'next/image'

type props = {
    name: string,
    sugar: number,
    consume: string | null,
    level: string | null,
}

const imageDrinks = {
  "กาแฟ": "/images/coffee.svg",
  "ชา": "/images/tea.svg",
  "น้ำผลไม้": "/images/juice.svg",
  "นม": "/images/milk.svg",
  "น้ำอัดลม": "/images/soft.svg",
  "โซดา": "/images/soda.svg",
}

function BeverageDrank({ name, sugar, consume, level}: props) {
    return (
        <div className='grid grid-cols-2 gap-2 rounded-2xl border border-blue shadow-beverage p-2 w-[160px] h-[110px]'>
            <div className='flex flex-col justify-center items-center gap-2'>
              <Image src={imageDrinks[name]} alt='' width={40} height={40}/>
              <h2 className='text-lg text-darkBlue'>{name}</h2>
            </div>
            <div className='flex flex-col justify-between items-center'>
              <div className='flex justify-center items-center bg-lightBlue rounded-md gap-2 px-2 w-full'>
                <div className='bg-blue w-2 h-2 rounded-full'/>
                <h3 className='text-light text-darkBlue text-sm'>{sugar} g</h3>
              </div>
              <div className='flex justify-center items-center bg-lightBlue rounded-md gap-2 px-2 w-full'>
                <Image src={BeverageIcon} alt='beverageIcon' width={10} height={10}/>
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