"use client";
import { useEffect, useState } from "react";
import DropDown from "./dropDown" // Ensure the file name matches the actual file
import { useRouter } from 'next/navigation';
import coffee from '../images/coffee.svg';

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
  
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);

  const router = useRouter();
  const handleClick = () => {
    router.push('/editAccount');
  }
  
  useEffect(() => {
    const fetchUser = async () => {
      const email = new URLSearchParams(window.location.search).get("email");
      const response = await fetch(`/api/getuser?email=${email}`);
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    };
    
    fetchUser();
  }, []);
  
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const getProfileImage = (gender: string) => {
    if (gender === "female") {
      return "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
    } else if (gender === "male") {
      return "https://images.unsplash.com/photo-1502767089025-6572583495b4?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"; // Replace with the actual male image URL
    } else {
      return "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"; // Default image
    }
  };



  return (
    
    <div className="relative">
      <h1 className="font-semibold text-[25px] text-center">ข้อมูลทั่วไป</h1>

      <div className="grid justify-center overflow-hidden gap-12 mt-3">
        <img
          className="inline-block h-32 w-32 rounded-full ring-2 ring-white"
          src={getProfileImage(user.gender)}
          alt=""
        />
      </div>
      <h1 className="mt-3 text-[20px] text-center">{user.name}</h1>


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
            <div className="font-bold text-2xl">
              {index === 0 ? user.weight : index === 1 ? user.height : user.bmi}
            </div>
            <div className="text-gray-500 text-sm">{stat}</div>
          </div>
        ))}
      </div>

      {/* Dropdown */}
      <section className="mt-4">
        <div className="grid justify-center">
          <h1 className="font-semibold text-lg text-center mt-2">เครื่องดื่มที่บริโภคบ่อย</h1>
          <div className="mt-6"><DropDown /></div>
        </div>
      </section>

      </div>

      // <h1>User Information 55555</h1>
      // <p>Name: {user.name}</p>
      // <p>Email: {user.email}</p>
      // <p>Gender: {user.gender}</p>
      // <p>Weight: {user.weight}</p>
      // <p>Height: {user.height}</p>
      // <p>BMI: {user.bmi}</p>
      // <p>Current Sugar: {user.currentSugar}</p>
      // <p>Beverage History: {user.beverageHistory.join(", ")}</p>
      // <p>Daily Sugar: {user.dailySugar.join(", ")}</p>
  
  );
};

export default GetUser;