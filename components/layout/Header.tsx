'use client';

import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';

const Header = () => {
  const {data: session} = useSession()
  const userName = session?.user?.name || 'userName'
  const userImg = session?.user?.image || '/default-user.png'

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className='flex items-center justify-between px-5 py-4 border-b border-blue bg-white sticky top-0 z-50'>
      <h1 className='font-bold text-4xl text-blue'>LOGO</h1>
      <div className='flex items-center gap-2'>
          <>
            <button 
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
            <h4 className='font-light text-blue text-sm'>{userName}</h4>
            <Image
              src={userImg}
              width={30}
              height={30}
              alt='user profile'
              className='rounded-full'
            />
          </>
      </div>
    </div>
  );
};

export default Header;

// import React from 'react'
// import { FaUserCircle } from "react-icons/fa";
// import GoogleSignOut from "../GoogleSigin"

// const Header = () => {
//   return (
//     <div className='flex items-center justify-between px-5 py-4 border-b border-blue bg-white sticky top-0 z-50'>
//         <h1 className='font-bold text-4xl text-blue'>LOGO</h1>
//         <div className='flex items-center gap-2'>
//           <GoogleSignOut / >
//             <h4 className='font-light text-blue text-sm'>userName</h4>
//             <FaUserCircle size={25} color='#4F80C0'/>
//         </div>
//     </div>
//   )
// }

// export default Header