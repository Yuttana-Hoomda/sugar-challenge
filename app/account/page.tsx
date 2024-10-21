'use client'
import React, { useState } from "react";
import Image from "next/image";
import DropDown from "./dropDown";
import Avartar1 from "../images/avartar1.svg";
import { useRouter } from "next/navigation";
const Account = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/editAccount");
  };


  return (
    <div className="relative">
      <h1 className="font-semibold text-[25px] text-center">ข้อมูลทั่วไป</h1>

      <div className="grid justify-center overflow-hidden gap-12 mt-3">
        <img
          className="inline-block h-32 w-32 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <h1 className="mt-3 text-[20px] text-center">โอเด็ต อิอิ</h1>

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
            <div className="font-bold text-lg">
              {index === 0 ? "62.5 kg" : index === 1 ? "165 cm" : "29.9"}
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
  );
};

export default Account;
