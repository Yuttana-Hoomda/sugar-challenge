'use client';
import React from 'react';
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import Avatar from '@/public/icons/avatar.svg'
import Logo from '@/public/images/Logo.svg';

const Header = () => {
  const { data: session } = useSession()
  const userName = session?.user?.name || 'userName'
  const userImg = session?.user?.image || Avatar

  return (
    <div className='flex items-center justify-between px-5 py-4 border-b border-blue bg-white sticky top-0 z-50'>
      <Image src={Logo} alt='logo'/>
      <div className='flex items-center gap-2'>
        <h4 className='font-light text-blue text-sm'>{userName}</h4>
        <Image
          src={userImg}
          width={30}
          height={30}
          alt='user profile'
          className='rounded-full'
        />
      </div>
    </div>
  );
};

export default Header;