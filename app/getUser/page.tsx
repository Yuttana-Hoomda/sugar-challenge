"use client";
import { useEffect, useState } from "react";
import DropDown from "./dropDown" // Ensure the file name matches the actual file
import { useRouter } from 'next/navigation';
import { IoIosMail } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';

const GetUser = () => {
  interface User {
    name: string;
    email: string;
    gender: string;
    weight: number;
    height: number;
    bmi: number;
    currentSugar: number;
    beverageHistory: string[];
    dailySugar: string[];
  }
    
  // สร้างฟังก์ชันสำหรับแสดงรูปโปรไฟล์
    const getProfileImage = () => {
      if (session?.user?.image) {
        return session.user.image;
      }
      // รูปภาพ default กรณีไม่มีรูปจาก email
      return '/default-avatar.png'; // ใส่รูป default ของคุณ
    };
  

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  const router = useRouter();
  const handleClick = () => {
    router.push('/editAccount');
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  useEffect(() => {
    if (status == 'loading' ){
      console.log("Loading");
      return;
    }
    if(!session){
      console.log("ยังไม่ได้เข้าสู่ระบบ");
      return;
    }
    
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/getUser`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          const errorData = await response.json();
          console.error("Error response data:", errorData);
          setError(errorData.error);
        }
      } catch (err) {
        console.error("Fetch error:", err); 
      }
    };
    fetchUser();
  }, []);
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  // const getProfileImage = (gender: string) => {
  //   if (gender === "female") {
  //     return "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
  //   } else if (gender === "male") {
  //     return "https://images.unsplash.com/photo-1502767089025-6572583495b4?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"; // Replace with the actual male image URL
  //   } else {
  //     return "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"; // Default image
  //   }
  // };

  return (

    <div className="relative">
    <h1 className="font-semibold text-[25px] text-center text-darkBlue">ข้อมูลทั่วไป</h1>

    <div className="grid justify-center overflow-hidden gap-12 mt-3">
      <div className="relative w-32 h-32">
        <Image
          src={getProfileImage()}
          alt="Profile Picture"
          width={128}
          height={128}
          className="rounded-full ring-2 ring-white object-cover"
         
        />
      </div>
    </div>

      {/* Edit button */}
      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={handleClick}
          className="text-white bg-gradient-to-r from-blue to-blue font-medium rounded-full text-m px-5 py-2.5 text-center me-2 mb-2"
        >
          แก้ไขข้อมูล
        </button>
      </div>

      <div className="flex gap-3 justify-center mt-4">
        {["Weight", "Height", "BMI"].map((stat, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-xl p-3 text-center w-28"
          >
            <div className="font-bold text-2xl text-darkBlue">
              {index === 0 ? user?.weight : index === 1 ? user?.height : user?.bmi}
            </div>
            <div className="text-gray-500 text-sm">{stat}</div>
          </div>
        ))}
      </div>

      {/* Dropdown */}
      <section className="mt-6">
        <div className="grid justify-center">
          <h1 className="font-semibold text-lg text-center mt-2 text-darkBlue">เครื่องดื่มที่บริโภคบ่อย</h1>
          <div className="mt-6"><DropDown /></div>
        </div>
      </section>

      <div className="flex justify-evenly items-center mt-10">
        <div 
          className="flex justify-center items-center gap-1 border border-darkBlue text-darkBlue font-semibold py-2 px-4 rounded"
          onClick={() => (window.location.href = 'https://lin.ee/IJnAkr8')}
        >
          <IoIosMail size={20} color="#002D63"/>
          <h3>ติดต่อเรา</h3>
        </div>
        <button
          onClick={handleSignOut}
          className="border border-darkBlue text-darkBlue font-semibold py-2 px-4 rounded"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default GetUser;