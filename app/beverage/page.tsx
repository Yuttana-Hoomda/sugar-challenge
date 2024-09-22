import BeverageCard from '@/components/modal/BeverageCard'
import React from 'react'
import IndexBeverage from '@/data/indexBeverage'

function Beverage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='grid grid-cols-2 gap-8 items-center justify-center'>
        {IndexBeverage.map((items) => (
          <div key={items.menu}>
            <BeverageCard menu={items.menu} img={items.img} sugarValue={items.sugarValue}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Beverage