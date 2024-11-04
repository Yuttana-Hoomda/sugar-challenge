'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import BottomBarList from '@/data/bottomBarList.json';
import { icons } from 'lucide-react';

interface navBarProps {
    IconSize:number
}

const BottomBar:React.FC<navBarProps> = ({IconSize}) => {
    const router = useRouter()
    const pathName = usePathname()
    const [activePath, setActivePath] = useState<string>('/');

    useEffect(() => {
        setActivePath(pathName || '/');
      }, [pathName]);

    const getImg = (path: string, icon: string, iconActive: string) => {
      if (activePath === path || (activePath.startsWith('/beverage')) && path.startsWith('/beverage')) {
        return iconActive
      }
      return icon
    }

    const handleClick = (path: string) => () => {
      router.push(path)
    }
    
  return (
    <nav className='flex items-center justify-between px-10 py-5 shadow-top bg-white sticky bottom-0'>
       {BottomBarList.map((items, index) => (
        <div key={index} onClick={handleClick(items.path)}>
            <Image
                src={getImg(items.path, items.icon, items.iconActive)}
                alt=''
                width={IconSize}
                height={IconSize}
            />
        </div>
       ))}
    </nav>
  )
}

export default BottomBar;