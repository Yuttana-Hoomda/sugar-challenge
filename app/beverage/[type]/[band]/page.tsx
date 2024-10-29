'use client'
import React from 'react'
import BeverageData from '@/data/beverageList.json'
import { IoChevronBackCircle } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import BeverageCard from '@/components/modal/AddBeverageCard';

interface MenuListProps {
  params: {
    type: string
    band: string
  }
}

function MenuList({ params }: MenuListProps) {
  const router = useRouter()
  const { type, band } = params
  const bandName = decodeURIComponent(band)
  const beverageType = decodeURIComponent(type)

  const getMenuListByBandName = (categoryName: string, bandName: string) => {
    const category = BeverageData.find(item => item.categoriesName === categoryName);
    const band = category?.bandList.find(items => items.bandName === bandName)
    return band ? band.menuList : [];
  }

  const menuList = getMenuListByBandName(beverageType, bandName)

  const goBack = () => {
    router.back()
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-4'>
        <IoChevronBackCircle
          size={26}
          color='#4F80C0'
          onClick={goBack}
        />
        <h2 className='text-xl text-darkBlue'>{beverageType}/{bandName}</h2>
      </div>
      <div className='flex flex-col justify-items-center items-center'>
        <div className='grid grid-cols-2 gap-8 items-center justify-center'>
          {
            menuList.length > 0 && (
              menuList.map((items) => (
                <div>
                  <BeverageCard 
                    menu={items.menu} 
                    img={items.img} 
                    imgSize={80}
                    sugarValue={items.sugarValue}
                    volume={items.volume}
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

export default MenuList
