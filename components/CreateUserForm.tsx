"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Ruler, User, Weight } from "lucide-react";

interface CreateUserFormProps {
  email: string;
}

export default function CreateUserForm({ email }: CreateUserFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    weight: "",
    height: "",
    email: email || "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate BMI
  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    console.log("Form data:", formData);

    // Check if all fields are filled
    if (!formData.name || !formData.gender || !formData.weight || !formData.height || !formData.email) {
      setError("All fields are required");
      
      return;
    }

    try {
      const res = await fetch("/api/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          weight: Number(formData.weight),
          height: Number(formData.height),
          bmi: calculateBMI(Number(formData.weight), Number(formData.height)),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Profile updated:", data);
        // Redirect to the data fetching page
        router.push(`/home`); // Adjust this URL to your actual data fetching page
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setError(error.message || "An error occurred while updating the profile");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div className="flex items-center p-3 rounded-xl mt-6 border border-indigo-950">
        <User className="text-gray-700 mr-3" />
        <input
          type="text"
          name="name"
          placeholder="ชื่อ-นามสกุล"
          value={formData.name}
          onChange={handleChange}
          className="flex-1 outline-none"
          required
        />
      </div>

      <div className="flex items-center bg-white p-3 rounded-lg border border-indigo-950">
        <User className="text-gray-700 mr-3" />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full flex-1 outline-none appearance-none bg-transparent"
        >
          <option value="">เลือกเพศ</option>
          <option value="male">ชาย</option>
          <option value="female">หญิง</option>
          <option value="other">อื่นๆ</option>
        </select>
      </div>

      <div className="flex gap-5">
        <div className="w-full flex border border-indigo-950 rounded-lg items-center bg-white p-3">
          <Weight className="text-gray-700 mr-3" />
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="น้ำหนัก (กก.)"
            required
            className="flex-1 outline-none"
          />
        </div>
        <span className="text-black font-medium rounded-lg items-center bg-sky-200 px-6 py-3">
          KG
        </span>
      </div>

      <div className="flex gap-5">
        <div className="w-full flex border border-indigo-950 rounded-lg items-center bg-white p-3">
          <Ruler className="text-gray-700 mr-3" />
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="ส่วนสูง (ซม.)"
            required
            className="flex-1 outline-none"
          />
        </div>
        <span className="text-black font-medium rounded-lg items-center bg-sky-200 px-6 py-3">
          CM
        </span>
      </div>

      <button
        type="submit"
        className="w-full flex text-white font-medium text-2xl rounded-lg bg-blue-500 bg-sky-700 px-24 py-3 whitespace-nowrap overflow-hidden gap-5 justify-center cursor-pointer mt-6"
      >
        บันทึกข้อมูล
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}