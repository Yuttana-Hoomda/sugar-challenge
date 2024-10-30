'use client';
import React from 'react';
import BeverageData from '@/data/beverageList.json'
import { IoChevronBackCircle } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import BeverageCard from '@/components/modal/BeverageCard';

interface BandListProps {
  params: {
    type: string;
  };
}

function BandList({ params }: BandListProps) {
  const router = useRouter()
  const { type } = params;
  const beverageType = decodeURIComponent(type);

  const getBandListByCategory = (categoryName: string) => {
    const category = BeverageData.find(item => item.categoriesName === categoryName);
    return category ? category.bandList : [];
  }

  const bandList = getBandListByCategory(beverageType)

  const pushSlug = (slug: string) => {
    router.push(`/beverage/${beverageType}/${slug}`)
  }

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
        <h2 className='text-xl text-darkBlue font-medium'>{beverageType}</h2>
      </div>
      <div className='flex flex-col justify-items-center items-center'>
        <div className='grid grid-cols-2 gap-8 items-center justify-center'>
          {
            bandList.length > 0 && (
              bandList.map((items, index) => (
                <div key={index}>
                  <BeverageCard 
                    menu={items.bandName} 
                    img={items.img} 
                    link={() => pushSlug(items.bandName)}
                    imgSize={75} 
                  />
                </div>
              ))
            )
          }
        </div>
      </div>
    </div>
  );
}

export default BandList;
