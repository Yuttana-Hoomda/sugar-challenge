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
    const fetchData = async () => {
      try {
        const [dailySugarData, beverageData] = await Promise.all([
          getData("getSugar"),
          getData("getBeverageHistory")
        ]);

        if (dailySugarData?.date === dateFormat() && beverageData[0]?.createAt === dateFormat()) {
          setSugarValue(dailySugarData.value);
          setBeverageList(beverageData);
        } else {
          setSugarValue(0);
          setBeverageList([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const dateFormat = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
        throw new Error(`Failed to fetch data from ${api}`);
      }

      return response.json();
    } catch (error) {
      console.error(`Error fetching ${api}:`, error);
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
          <div className="grid grid-cols-2 grid-flow-row justify-items-center items-center gap-8">
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
        <div className="fixed top-0 left-0 z-[60] inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-lightBlue p-4 rounded-xl w-[700px] text-center text-darkBlue mx-4">
            <h2 className="text-xl font-semibold ">น้ำตาล</h2>
            <p className="text-start">
              เป็นคาร์โบไฮเดรตที่ให้พลังงานสูง แต่ขาดสารอาหารอื่นที่มีประโยชน์ พบได้ทั้งในธรรมชาติและอาหารแปรรูป กรมอนามัยแนะนำให้ผู้ใหญ่บริโภคน้ำตาลไม่เกิน 6 ช้อนชาต่อวัน (ประมาณ 24 กรัม) และเด็กควรบริโภคน้อยกว่านี้ เพื่อลดความเสี่ยงต่อโรคอ้วน เบาหวาน หัวใจ และฟันผุ <br />
            </p>
            <h2 className="text-xl font-semibold ">โรคฟันผุ</h2>
            <p className="text-start">
              เกิดจากการบริโภคเครื่องดื่มที่มีน้ำตาลสูง เช่น น้ำอัดลม ชานมไข่มุก และน้ำผลไม้ ซึ่งกรดจากแบคทีเรียและตัวเครื่องดื่มเองจะกัดกร่อนเคลือบฟัน ทำให้ฟันอ่อนแอและเกิดโพรงฟันตามมา <br />
              วิธีป้องกันโรคฟันผุ <br />
              •	การลดปริมาณเครื่องดื่มหวาน <br />
              •	ดื่มน้ำเปล่าหลังการดื่มน้ำหวาน <br />
              •	ใช้หลอดดื่ม และใช้ยาสีฟันผสมฟลูออไรด์
            </p>
            <button onClick={closePopup} className="mt-5 bg-white w-10 rounded-md">
              ปิด
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;