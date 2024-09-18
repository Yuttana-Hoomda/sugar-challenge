import Image from 'next/image'
import React from 'react'
type props = {
    title:string,
    className:string,
    onClick: () => void,
    icon?:any,
    disable?: boolean
}

const SelectButton = ({title, className, icon, onClick, disable}: props) => {
  return (
    <button
        className={`${className} flex items-center justify-center border-blue border-2 rounded-lg h-[35px] text-blue gap-2`}
        onClick={onClick}
        disabled={disable}
    >
        {icon ? <Image src={icon} alt='' width={15} height={18}/> : null}
        <h3 className='text-[16px] '>{title}</h3>
    </button>
  )
}

export default SelectButton