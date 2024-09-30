'use client';

import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className='flex items-center justify-between px-5 py-4 border-b border-blue bg-white sticky top-0 z-50'>
      <h1 className='font-bold text-4xl text-blue'>LOGO</h1>
      <div className='flex items-center gap-2'>
        {status === 'authenticated' && (
          <>
            <button 
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
            <h4 className='font-light text-blue text-sm'>{session?.user?.name || 'User'}</h4>
            <FaUserCircle size={25} color='#4F80C0'/>
          </>
        )}
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