'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation';
import IconData from '@/data/iconData';
import path from 'path';

interface navBarProps {
    IconSize:number
}

const NavBar:React.FC<navBarProps> = ({IconSize}) => {
    const router = useRouter()
    const pathName = usePathname()
    const [activePath, setActivePath] = useState<string>('/');

    useEffect(() => {
        setActivePath(pathName || '/');
      }, [pathName]);

    const getIcon = (path: string) => {
        const key = path as keyof typeof IconData;
        return activePath === path ? IconData[key].active : IconData[key].default;
    }

    const handleClick = (path: string) => () => {
        router.push(path)
    }
    
  return (
<<<<<<< HEAD:components/NavBar.tsx
    <nav className='flex items-center justify-between px-10 py-6 shadow-top left-0 bottom-0'>
=======
    <nav className='flex items-center justify-between px-10 py-5 shadow-top bg-white sticky bottom-0'>
>>>>>>> cba16f6ac71bfdd76d850a86a55528f6e579b642:components/layout/NavBar.tsx
       {Object.keys(IconData).map((path) => (
        <div key={path} onClick={handleClick(path)}>
            <Image
                src={getIcon(path)}
                alt=''
                width={IconSize}
                height={IconSize}
            />
        </div>
       ))}
    </nav>
  )
}

export default NavBar