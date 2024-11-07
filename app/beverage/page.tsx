'use client'
import BeverageCard from '@/components/modal/BeverageCard'
import React from 'react'
import BeverageData from '@/data/beverageList.json'
import BeverageIcon from '@/public/icons/beverageIcon.svg';
import { useRouter } from 'next/navigation'
import Image from 'next/image';

function Beverage() {
  const router = useRouter()

  const pushSlug = (slug: string) => {
    router.push(`/beverage/${slug}`)
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <Image src={BeverageIcon} alt='' width={20} height={20}/>
        <h2 className='text-xl text-darkBlue font-medium'>เลือกเครื่องดื่ม</h2>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className='grid grid-cols-2 gap-8 items-center justify-center'>
          {
            BeverageData.length > 0 && (
              BeverageData.map((items, index) => (
                <div key={index}>
                  <BeverageCard
                    menu={items.categoriesName}
                    img={items.img}
                    link={() => pushSlug(items.categoriesName)}
                    imgSize={50}
                  />
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Beverage