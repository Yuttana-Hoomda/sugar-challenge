import Image from 'next/image';
import React, { useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import SelectButton from './SelectButton';
import Hundred from '../../public/icons/hundred.svg'
import Twentyfive from '../../public/icons/seventyfive.svg'
import Fifty from '../../public/icons/fifty.svg'
import Seventyfive from '../../public/icons/twentyfive.svg'
import HundredActive from '../../public/icons/hundred-active.svg'
import TwentyfiveActive from '../../public/icons/seventyfive-active.svg'
import FiftyActive from '../../public/icons/fifty-active.svg'
import SeventyfiveActive from '../../public/icons/twentyfive-active.svg'

interface AddBeverageModalProps {
  menu: string,
  img: any,
  handleOpen: boolean,
  handleClose: () => void,
  sugarValue: number
}

const AddBeverageModal: React.FC<AddBeverageModalProps> = ({ menu, img, sugarValue, handleOpen, handleClose }) => {
  const [activeSweet, setActiveSweet] = useState<number | null>(null);
  const [activeQuantitie, setActiveQuantitie] = useState<number | null>(null);
  const [sugar, setSugar] = useState(0);

  if (handleOpen === false) {
    return null
  }

  const handleModalClose = () => {
    setActiveQuantitie(null)
    setActiveSweet(null)
    handleClose()
  }

  const sweetLevel = ['หวานน้อย', 'หวานปกติ', 'หวานมาก'];
  const quantitieLevel = [
    {
      quantities: '100%',
      icon: Hundred,
      iconActive: HundredActive
    },
    {
      quantities: '75%',
      icon: Seventyfive,
      iconActive: SeventyfiveActive
    },
    {
      quantities: '50%',
      icon: Fifty,
      iconActive: FiftyActive
    },
    {
      quantities: '25%',
      icon: Twentyfive,
      iconActive: TwentyfiveActive
    },
  ]

  const handleSweetLevelButton = (index: number) => {
    setActiveSweet(index)

    //calculate sugarValue by index
    let updateSugar = sugarValue
    switch (index) {
      case 0:
        updateSugar = sugarValue / 2;
        break;
      case 1:
        updateSugar = sugarValue;
        break
      case 2:
        updateSugar = sugarValue * 1.5
        break
    }
    setSugar(updateSugar)
  }

  const handleQuantitieLevelButton = (index: number) => {
    setActiveQuantitie(index)

    let updateSugar = sugar
    switch (index) {
      case 0:
        updateSugar = sugar
        break
      case 1:
        updateSugar = sugar * 0.75
        break;
      case 2:
        updateSugar = sugar * 0.5
        break;
      case 3:
        updateSugar = sugar * 0.25
        break;
    }
    setSugar(updateSugar)
  }

  const handleSubmit = () => {
    //write post value backend here
    console.log(sugar)
    setActiveQuantitie(null)
    setActiveSweet(null)
    handleClose()
  }

  return (
    <div className='bg-black bg-opacity-30 w-screen h-screen fixed top-0 left-0 z-[60] flex-center'>
      <div className='bg-white rounded-xl w-full relative mx-4 px-4 py-6'>
        <IoIosCloseCircle size={28} color='#4F80C0' className='absolute top-2 right-2' onClick={handleModalClose} />
        <div className='flex flex-col justify-center items-center gap-2'>
          <Image src={img} alt='' width={80} height={80} />
          <h2 className='font-bold text-3xl text-darkBlue'>{menu}</h2>
        </div>
        <div className='space-y-4 pt-4'>
          {/* sweetLevel */}
          <div className='space-y-2'>
            <h3 className='text-xl text-darkBlue'>ความหวาน</h3>
            <div className='flex items-center gap-2'>
              {sweetLevel.map((level, index) => (
                <div key={index}>
                  <SelectButton
                    title={level}
                    className={`w-[90px] ${activeSweet === index
                        ? 'bg-buttonActive border-darkBlue text-darkBlue'
                        : ''
                      }`}
                    onClick={() => handleSweetLevelButton(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Quantitie Level */}
          <div className='space-y-2'>
            <h3 className='text-[18px] text-darkBlue'>ปริมาณที่ดื่ม</h3>
            <div className='flex items-center justify-between'>
              {quantitieLevel.map((items, index) => (
                <div key={index}>
                  <SelectButton
                    title={items.quantities}
                    icon={
                      activeQuantitie === index
                        ? items.iconActive : items.icon
                    }
                    className={`w-[75px] ${activeQuantitie === index
                        ? 'bg-buttonActive border-darkBlue text-darkBlue' : ''
                      } ${activeSweet === null
                        ? 'opacity-50' : ''
                      }`}
                    onClick={() => handleQuantitieLevelButton(index)}
                    disable = {activeSweet === null}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={`${activeSweet === null || activeQuantitie === null ? 'opacity-50' : ''} flex-center pt-8`}>
          <button
            className='bg-gradient-to-r from-blue to-darkBlue text-white rounded-xl w-[80%] py-2 font-medium text-xl'
            onClick={handleSubmit}
            disabled={activeSweet === null || activeQuantitie === null}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddBeverageModal