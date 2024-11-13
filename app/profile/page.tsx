"use client";
import { useEffect, useState } from "react";
import DropDown from "./dropDown" // Ensure the file name matches the actual file
import { useRouter } from 'next/navigation';
import { IoIosMail } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import Image from 'next/image';
import defualt from '@/public/images/Logo.svg';
import { Ruler, User, Weight, X, Check } from "lucide-react";
import ProfileSkeleton from "@/components/skeletons/ProfileSkeleton";

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
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    gender: "",
    weight: "",
    height: "",
    email: session?.user?.email || "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/getuser`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setFormData({
            gender: userData.gender || "",
            weight: userData.weight?.toString() || "",
            height: userData.height?.toString() || "",
            email: userData.email || session?.user?.email || "",
          });


        } else {
          const errorData = await response.json();
          console.error("Error response data:", errorData);
          setError(errorData.error);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateBMI = (weight: number, height: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!formData.weight || !formData.height) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน");
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
        setIsModalOpen(false);
        // Refresh user data
        const userResponse = await fetch(`/api/getuser`);
        if (userResponse.ok) {
          const userData = await userResponse.json();
          setUser(userData);
        }
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update profile");
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setError(error.message || "เกิดข้อผิดพลาดในการอัพเดทข้อมูล");
    }
  };

  // สร้างฟังก์ชันสำหรับแสดงรูปโปรไฟล์
  const getProfileImage = () => {
    if (session?.user?.image) {
      return session.user.image;
    }
    // รูปภาพ default กรณีไม่มีรูปจาก email
    return defualt.src; // ใส่รูป default ของคุณ
  };

  if (isLoading) {
    return <ProfileSkeleton />
  }


  if (error) {
    return <div>Error: {error}</div>;
  }

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

      <div className="flex flex-col items-center justify-center mt-3">
        <h3 className="text-darkBlue font-semibold text-xl">{session?.user?.name}</h3>
        <h4 className="text-gray-500 text-sm">{session?.user?.email}</h4>
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
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

      <section className="mt-6">
        <div className="grid justify-center">
          <h1 className="font-semibold text-lg text-center mt-2 text-darkBlue">เครื่องดื่มที่บริโภคบ่อย</h1>
          <div className="mt-6"><DropDown /></div>
        </div>
      </section>

      <div className="flex justify-evenly items-center mt-10">
        <div
          className="flex justify-center items-center gap-1 border border-darkBlue text-darkBlue font-semibold py-2 px-4 rounded cursor-pointer"
          onClick={() => window.location.href = 'https://lin.ee/IJnAkr8'}
        >
          <IoIosMail size={20} color="#002D63" />
          <h3>ติดต่อเรา</h3>
        </div>
        <button
          onClick={handleSignOut}
          className="border border-darkBlue text-darkBlue font-semibold py-2 px-4 rounded"
        >
          ออกจากระบบ
        </button>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h2 className="text-center font-bold text-2xl mb-6">แก้ไขข้อมูลส่วนตัว</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="flex-1 w-10 outline-none"
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
                    className="flex-1 w-10 outline-none"
                  />
                </div>
                <span className="text-black font-medium rounded-lg items-center bg-sky-200 px-6 py-3">
                  CM
                </span>
              </div>

              <button
                type="submit"
                className="w-full text-white font-medium text-xl rounded-lg bg-sky-700 px-6 py-3 hover:bg-sky-800 transition-colors"
              >
                บันทึกข้อมูล
              </button>

              {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetUser;