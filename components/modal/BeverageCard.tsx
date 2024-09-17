import Image from 'next/image'
import React from 'react'
import { FaCirclePlus } from "react-icons/fa6";

interface BeverageCardProps {
    menu: string,
    img: any,
}

const BeverageCard:React.FC<BeverageCardProps> = ({menu, img}) => {
  return (
    <div className='w-[150px] h-[150px] border-blue border rounded-xl bg-white flex justify-center items-center relative shadow-beverage'>
        <FaCirclePlus color='4F80C0' size={25} className='absolute top-2 right-2'/>
        <div className='flex flex-col justify-center items-center gap-2'>
            <Image src={img} alt='' width={50}/>
            <h2 className='text-darkBlue font-medium text-lg'>{menu}</h2>
        </div>
    </div>
  )
}

export default BeverageCard