'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GoogleSignin from "@/components/GoogleSigin";
import Logo from '@/public/icons/LOGO.svg'
import Bandner from '@/public/icons/SUGARCHALLENGE.svg'
import bg from '@/public/icons/Subtract.svg'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import LoadingSpin from '@/components/skeletons/LoadingSpin';

const Longin = () => {
  const { status, data: session } = useSession();
  const router = useRouter();
  // const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      checkUserData();
    }
  }, [status, session]);

  const checkUserData = async () => {
    if (!session?.user?.email) return;

    try {
      const response = await fetch('/api/getUser');
      if (response.ok) {
        const userData = await response.json();
        if (userData.gender && userData.weight && userData.height) {
          router.push(`/home`);
        } else {
          router.push(`/createUser`);
        }
      } else if (response.status === 404) {
        router.push('/createUser');
      } else {
        console.error('Unexpected error:', response.statusText);
      }
    } catch (error) {
      console.error('Error checking user data:', error);
    }
  };


  if (status === "loading" || status === "authenticated") {
    return <LoadingSpin/>
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen bg-blue px-6 relative'>
      <div className=" bg-white py-2 rounded-2xl h-full my-[120px] w-full flex flex-col justify-evenly items-center">
        <div className='flex flex-col items-center justify-center gap-10'>
          <Image src={Logo} alt='LOGO' width={125} height={125} />
          <Image src={Bandner} alt='SUGAR' width={200} height={200} />
        </div>
        <GoogleSignin />
      </div>
      <div className='w-full text-center text-white absolute bottom-0'>
        <h2>copyright © 2024 Sirindhorn College of Public Health Khon kaen. All Rights Reserved</h2>
      </div>
    </div>
  );
}

export default Longin