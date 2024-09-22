"use client";
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import GoogleSignin from "./GoogleSigin";
import { useRouter } from 'next/navigation';

export default function UserLogin() {
  const { status, data: session } = useSession();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && !isChecking) {
      checkUserData();
    }
  }, [status, isChecking]);

  const checkUserData = async () => {
    if (!session?.user?.email) return;
    
    setIsChecking(true);
    try {
      const response = await fetch(`/api/getuser?email=${encodeURIComponent(session.user.email)}`);
      if (response.ok) {
        const userData = await response.json();
        if (userData.gender && userData.weight && userData.height) {
          router.push('/getUser');
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
    } finally {
      setIsChecking(false);
    }
  };
  

  if (status === "loading" || isChecking) {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div className="shadow-xl p-8 rounded-md flex flex-col gap-3 bg-white text-zinc-500">
        <div>Redirecting...</div>
      </div>
    );
  }

  return <GoogleSignin />;
}

// "use client";
// import { useEffect } from 'react';
// import { useSession, signOut } from "next-auth/react";
// import GoogleSigin from "./GoogleSigin";
// import { useRouter } from 'next/navigation';

// export default function UserLogin() {
//   const { status, data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === "authenticated") {
//       checkUserData();
//     }
//   }, [status]);

//   const checkUserData = async () => {
//     try {
//       const response = await fetch(`/api/getUser?email=${encodeURIComponent(session.user.email)}`);
//       if (response.ok) {
//         const userData = await response.json();
//         if (userData.gender && userData.weight && userData.height) {
//           router.push('/getUser');
//         } else {
//           router.push('/createUser');
//         }
//       } else if (response.status === 404) {
//         router.push('/createUser');
//       }
//     } catch (error) {
//       console.error('Error checking user data:', error);
//     }
//   };

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   if (status === "authenticated") {
//     return (
//       <div className="shadow-xl p-8 rounded-md flex flex-col gap-3 bg-white text-zinc-500">
//         <div>Redirecting...</div>
//       </div>
//     );
//   }

//   return <GoogleSigin />;
// }