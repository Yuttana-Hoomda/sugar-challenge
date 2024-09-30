
"use client";

import React, { useState } from "react";
import { User, Weight, Ruler } from "lucide-react";
import Image from "next/image";
import BMI from "../images/BMI.svg"; // Adjust the path as necessary
import CircularProgressBMI from "@/components/CircularProgressBMI"; // Adjust the import path as necessary

const Register = () => {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>("");

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, "");
    setWeight(value === "" ? "" : Number(value));
  };

  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, "");
    setHeight(value === "" ? "" : Number(value));
  };

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      setBmi(bmiValue);
      setBmiCategory(getBMICategory(bmiValue));
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "น้ำหนักต่ำกว่าเกณฑ์";
    if (bmi < 23.0) return "น้ำหนักสมส่วน";
    if (bmi < 25.0) return "น้ำหนักเกินมาตรฐาน";
    if (bmi < 30.0) return "น้ำหนักอยู่ในเกณฑ์อ้วน";
    return "น้ำหนักอยู่ในเกณฑ์อ้วนมาก";
  };

  const handleSubmit = async () => {
    calculateBMI();
    const userData = {
      name,
      gender,
      weight,
      height,
      bmi,
      bmiStatus: bmiCategory,
    };

    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('User created:', data);
    } else {
      console.error('Error creating user:', response.statusText);
    }
  };

  return (
    <div>
      <div className="text-center font-light text-2xl">Hey there,</div>
      <div className="text-center mt-4 font-bold text-3xl">
        Create an account
      </div>

      {/* User info fields */}
      <div className="space-y-4">
        <div className="flex items-center p-3 rounded-xl mt-6 border border-indigo-950">
          <User className="text-gray-700 mr-3" />
          <input
            type="text"
            placeholder="ชื่อ-นามสกุล"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 outline-none"
          />
        </div>

        <div className="flex items-center bg-white p-3 rounded-lg border border-indigo-950">
          <User className="text-gray-700 mr-3" />
          <select
            className="flex-1 outline-none appearance-none bg-transparent"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="" disabled hidden>
              เลือกเพศของคุณ
            </option>
            <option value="หญิง">หญิง</option>
            <option value="ชาย">ชาย</option>
          </select>
        </div>

        <div className="flex gap-5">
          <div className="flex border border-indigo-950 rounded-lg items-center bg-white p-3 ">
            <Weight className="text-gray-700 mr-3 " />
            <input
              type="number"
              placeholder="น้ำหนักของคุณ (kg)"
              value={weight}
              onChange={handleWeightChange}
              className="flex-1 outline-none"
            />
          </div>
          <span className="text-black font-medium rounded-lg items-center bg-sky-200 px-6 py-3 ">
            KG
          </span>
        </div>

        <div className="flex gap-5">
          <div className="flex border border-indigo-950 rounded-lg items-center bg-white p-3 ">
            <Ruler className="text-gray-700 mr-3 " />
            <input
              type="number"
              placeholder="ส่วนสูงของคุณ (cm)"
              value={height}
              onChange={handleHeightChange}
              className="flex-1 outline-none"
            />
          </div>
          <span className="text-black font-medium rounded-lg items-center bg-sky-200 px-6 py-3 ">
            CM
          </span>
        </div>

        <div
          className="flex text-white font-medium text-2xl rounded-lg bg-blue-500 bg-sky-700 px-24 py-3 whitespace-nowrap overflow-hidden gap-5 justify-center cursor-pointer"
          onClick={calculateBMI}
        >
          <Image src={BMI} alt="BMI" />
          <div className="mt-3">คำนวณค่ามาตรฐาน</div>
        </div>

        {bmi !== null && (
          <div className="flex flex-col items-center text-white font-medium text-2xl rounded-2xl bg-blue-500 bg-gray-300 px-24 py-8 gap-5 justify-center">
            <div className="w-full max-w-xs">
              <CircularProgressBMI
                size="100%" // Use relative size
                bmiValue={bmi}
                strokeColor="#4F80C0"
                backgroundColor="#e6e6e6"
                textColor="#000"
              />
            </div>
            <div className="text-4xl text-black text-center">{bmiCategory}</div>
          </div>
        )}
        
      </div>

      <div 
       className='flex text-white font-medium text-2xl rounded-lg bg-blue-500 bg-sky-700 px-24 py-3 whitespace-nowrap overflow-hidden gap-5 justify-center cursor-pointer mt-6'
       onClick={handleSubmit}>
        ลงทะเบียนเสร็จสิ้น
      </div>
    </div>
  );
};

export default Register;