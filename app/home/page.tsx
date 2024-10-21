"use client";
import React, { useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import CircularProgress from "@/components/CircularProgress";
import BeverageDrank from "@/components/modal/BeverageDrank";
import { useManageCookies } from "@/hooks/useManageCookies";
import EmptyBeverage from "@/public/icons/hundred.svg";
import Image from "next/image";
import { useSession } from "next-auth/react";

const HomePage = () => {
  //const { beverageHistory } = useManageCookies();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status, update } = useSession();
  const [dailySugar, setDailySugar] = useState([]);
  const [sugarValue, setSugarValue] = useState(0);

  console.log("session page: ", session);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      getDailySugarData();
    }
  }, [isLoading]);

  const getDailySugarData = async () => {
    try {
      const response = await fetch("/api/getSugar", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit sugar data");
      }

      const result = await response.json();
      if (result) {
        setDailySugar(result.dailySugar);
        setSugarValue(result.sugarValue);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-blue border bg-lightBlue rounded-xl py-2 px-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-2xl text-darkBlue">ปริมาณน้ำตาล</h1>
          <FaCircleInfo size={20} color="#4F80C0" />
        </div>
        <div className="flex-center py-6">
          <CircularProgress size={165} sugarValue={sugarValue} />
        </div>
      </div>

      <div className="flex flex-col flex-auto space-y-5 mt-12">
        <h3 className="font-semibold text-2xl mt-2 text-darkBlue">ล่าสุด</h3>
        {dailySugar.length > 0 ? (
          <div className="grid grid-cols-2 grid-flow-row justify-items-center items-center gap-5">
            {dailySugar.map((item, index) => (
              <div key={index}>
                <BeverageDrank
                  name={item.menu}
                  sugar={item.value}
                  consume={item.quantities}
                  level={item.sweetLevel}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-lightBlue w-full h-full rounded-xl flex flex-col justify-center items-center opacity-50 p-10 gap-5">
            <Image
              src={EmptyBeverage}
              alt="empty beverage"
              width={60}
              height={60}
              className="opacity-80"
            />
            <h3 className="text-xl text-blue">ยังไม่ได้ดื่มเครื่องดื่ม</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
