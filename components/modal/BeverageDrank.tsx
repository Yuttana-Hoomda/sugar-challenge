import React from 'react'
import BeverageIcon from '@/public/icons/beverageIcon.svg';
import Image from 'next/image'

interface beverageDrankProps {
    name: string,
    sugar: number,
    consume: string | null,
    level: string | null,
    img: string
}

const BeverageDrank:React.FC<beverageDrankProps> = ({ name, sugar, consume, level, img}) => {
  const celiFirstDigit = (num: number) => {
    const factor  = Math.pow(10, 1);
    return Math.ceil(num * factor) / factor
  }
  const ceilSugar = celiFirstDigit(sugar)
    return (
        <div className='grid grid-cols-2 gap-2 rounded-2xl border border-blue shadow-beverage p-2 w-[165px] h-[125px]'>
            <div className='flex flex-col justify-evenly items-center gap-2'>
              <Image src={img} alt='' width={40} height={40}/>
              <h2 className='text-sm text-darkBlue text-center truncate max-w-[75px]'>{name}</h2>
            </div>
            <div className='flex flex-col justify-between items-center'>
              <div className='flex justify-evenly items-center bg-lightBlue rounded-md gap-2 px-2 w-full'>
                <div className='bg-blue w-2 h-2 rounded-full'/>
                <h3 className='text-light text-darkBlue text-sm'>{ceilSugar} g</h3>
              </div>
              <div className='flex justify-evenly items-center bg-lightBlue rounded-md gap-2 px-2 w-full'>
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