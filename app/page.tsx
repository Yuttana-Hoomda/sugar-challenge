'use client'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GoogleSignin from "@/components/GoogleSigin";
import React, { useEffect, useState } from 'react'

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
        const response = await fetch(`/api/getuser?email=${encodeURIComponent(session.user.email)}`);
        if (response.ok) {
          const userData = await response.json();
          if (userData.gender && userData.weight && userData.height) {
            router.push('/home');
          } else {
            router.push('/createUser');
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
    
  
    if (status === "loading") {
      return <div>Loading...</div>;
    }
  
    if (status === "authenticated") {
      return (
        <div className="shadow-xl p-8 rounded-md flex flex-col gap-3 bg-white text-zinc-500">
          <div>Redirecting...</div>
        </div>
      );
    }
  
    return (
        <div className='grid justify-items-center items-center'>
            <GoogleSignin/>
        </div>
    );
}

export default Longin