"use client";
import React, { useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import CircularProgress from "@/components/CircularProgress";
import BeverageDrank from "@/components/modal/BeverageDrank";
import EmptyBeverage from "@/public/icons/hundred.svg";
import Image from "next/image";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";

interface BeverageItem {
  menu: string;
  value: number;
  quantities: string;
  sweetLevel: string;
  img: string
}

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [beverageList, setBeverageList] = useState<BeverageItem[]>([]);
  const [sugarValue, setSugarValue] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchData()
    setIsLoading(false);
  }, []);

  const dateFormat = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const fetchData = async () => {
    try {
      const [dailySugarData, beverageData] = await Promise.all([
        getData("getSugar"),
        getData("getBeverageHistory")
      ])

      if (dailySugarData.date === dateFormat() && beverageData[0].createAt === dateFormat()) {
        setSugarValue(dailySugarData.value)
        setBeverageList(beverageData)
      } else {
        setSugarValue(0)
        setBeverageList([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getData = async (api: string) => {
    try {
      const response = await fetch(`/api/${api}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit sugar data");
      }

      const result = await response.json();
      console.log(result)
      return result
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return <HomeSkeleton />;
  }

  const handleClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-blue border bg-lightBlue rounded-xl py-2 px-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-2xl text-darkBlue">ปริมาณน้ำตาล</h1>
          <button onClick={handleClick}><FaCircleInfo size={20} color="#4F80C0" /></button>
        </div>
        <div className="flex-center py-6">
          <CircularProgress size={165} sugarValue={sugarValue} />
        </div>
      </div>

      <div className="flex flex-col flex-auto space-y-5 mt-12">
        <h3 className="font-semibold text-2xl mt-2 text-darkBlue">ล่าสุด</h3>
        {beverageList.length > 0 ? (
          <div className="grid grid-cols-2 grid-flow-row justify-items-center items-center gap-5">
            {beverageList.map((item, index) => (
              <div key={index}>
                <BeverageDrank
                  name={item.menu}
                  sugar={item.value}
                  consume={item.quantities}
                  level={item.sweetLevel}
                  img={item.img}
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

      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-lightBlue p-4 rounded-xl w-[700px] text-center text-darkBlue">
            <h2 className="text-xl font-semibold ">โรคฟันผุ</h2>
            <p className="text-start">
              เกิดจากการบริโภคเครื่องดื่มที่มีน้ำตาล เช่น น้ำอัดลม ชานมไข่มุก น้ำผลไม้ และเครื่องดื่มชูกำลัง มีสาเหตุหลักจากน้ำตาลและกรดที่อยู่ในเครื่องดื่มเหล่านี้ซึ่งทำลายเคลือบฟัน กระบวนการเกิดฟันผุจากเครื่องดื่มหวานมีรายละเอียดดังนี้
              <br/>1. น้ำตาลและแบคทีเรีย - เมื่อเราดื่มเครื่องดื่มที่มีน้ำตาล น้ำตาลจะเป็นแหล่งอาหารของแบคทีเรียในช่องปาก เช่น แบคทีเรียกลุ่มสเตรปโตคอกคัสมิวแทนส์ (Streptococcus mutans) แบคทีเรียเหล่านี้จะย่อยสลายน้ำตาลและสร้างกรดออกมา
              <br/> 2. กรดจากเครื่องดื่ม - นอกจากแบคทีเรียจะผลิตกรดแล้ว เครื่องดื่มหลายชนิด เช่น น้ำอัดลมหรือน้ำผลไม้ ยังมีกรดที่อยู่ในตัวเอง (เช่น กรดซิตริกและกรดฟอสฟอริก) กรดเหล่านี้จะกัดกร่อนเคลือบฟันทันทีเมื่อเราดื่ม ทำให้ฟันสึกกร่อนได้ง่ายขึ้น
              <br/> 3. ผลกระทบต่อเคลือบฟัน - การบริโภคเครื่องดื่มที่มีน้ำตาลและกรดบ่อยครั้ง ทำให้เคลือบฟันอ่อนแอ เมื่อกรดกัดกร่อนเข้าไปลึกขึ้นในชั้นฟัน ทำให้เกิดโพรงในฟันและนำไปสู่การฟันผุในที่สุด
            </p>
            <button onClick={closePopup} style={{ marginTop: "10px" }}>
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;