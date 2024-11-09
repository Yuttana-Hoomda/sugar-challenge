import Image from "next/image";
import React, { memo, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import SelectButton from "../SelectButton";
import Hundred from "../../public/icons/hundred.svg";
import Twentyfive from "../../public/icons/twentyfive.svg";
import Fifty from "../../public/icons/fifty.svg";
import Seventyfive from "../../public/icons/seventyfive.svg";
import HundredActive from "../../public/icons/hundred-active.svg";
import TwentyfiveActive from "../../public/icons/twentyfive-active.svg";
import FiftyActive from "../../public/icons/fifty-active.svg";
import SeventyfiveActive from "../../public/icons/seventyfive-active.svg";
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';

interface AddBeverageModalProps {
  menu: string;
  img: any;
  handleOpen: boolean;
  handleClose: () => void;
  sugarValue: number;
  volume: number;
  sweetSelect: boolean;
}

interface SubmitSugarDataParams {
  date: string;
  value: number;
}

interface BeverageData {
  menu: string;
  img: string;
  value: number;
  quantities: string | null;
  sweetLevel: string | null;
  createAt: string
}

interface DailySugar {
  date: string;
  value: number
}

const AddBeverageModal: React.FC<AddBeverageModalProps> = memo(({
  menu,
  img,
  sugarValue,
  handleOpen,
  handleClose,
  volume,
  sweetSelect
}) => {
  const [activeSweet, setActiveSweet] = useState<number | null>(null);
  const [activeQuantitie, setActiveQuantitie] = useState<number | null>(null);

  if (handleOpen === false) {
    return null;
  }

  const handleModalClose = () => {
    setActiveQuantitie(null);
    setActiveSweet(null);
    handleClose();
  };

  const sweetLevel = ["ไม่หวาน", "หวานน้อย", "หวานปกติ", "หวานมาก"];
  const quantitieLevel = [
    { quantities: "100%", icon: Hundred, iconActive: HundredActive },
    { quantities: "75%", icon: Seventyfive, iconActive: SeventyfiveActive },
    { quantities: "50%", icon: Fifty, iconActive: FiftyActive },
    { quantities: "25%", icon: Twentyfive, iconActive: TwentyfiveActive },
  ];

  const handleSweetLevelButton = (index: number) => {
    setActiveSweet(index);
  };

  const handleQuantitieLevelButton = (index: number) => {
    setActiveQuantitie(index);
  };

  const calculateSugar = (
    sugarValue: number,
    activeSweet: number | null,
    activeQuantitie: number | null
  ) => {
    let updatedSugar = sugarValue;

    // Calculate sweetness level
    if(sweetSelect) {
      switch (activeSweet) {
        case 0:
          updatedSugar = sugarValue * 0.25;
          break;
        case 1:
          updatedSugar = sugarValue * 0.5;
          break;
        case 2:
          updatedSugar = sugarValue;
          break;
        case 3:
          updatedSugar = sugarValue * 1.5;
          break;
      }
    }

    // Calculate quantity level
    switch (activeQuantitie) {
      case 0:
        updatedSugar = updatedSugar;
        break;
      case 1:
        updatedSugar = updatedSugar * 0.75;
        break;
      case 2:
        updatedSugar = updatedSugar * 0.5;
        break;
      case 3:
        updatedSugar = updatedSugar * 0.25;
        break;
    }

    return updatedSugar;
  };

  const postData = async (data: BeverageData | DailySugar, api: string) => {
    try {
      const res = await fetch(`/api/${api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      const result = await res.json()
      console.log(result);
    } catch (error) {
      console.log(error)
    }
  }

  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const checkTimeInRange = () => {
    // Get current time in Thailand timezone
    const options: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Bangkok', hour: 'numeric', minute: 'numeric' };
    const thailandTime = new Date().toLocaleString('en-US', options);
    const [timeStr, period] = thailandTime.split(' ');
    const [hours, minutes] = timeStr.split(':');
     // Convert to 24-hour format
     let hour = parseInt(hours);
     if (period === 'PM' && hour !== 12) {
       hour += 12;
     } else if (period === 'AM' && hour === 12) {
       hour = 0;
     }
 
     // Check if time is within allowed ranges
     const morningRange = hour >= 10 && hour < 11;
     const afternoonRange = hour >= 14 && hour < 17;
     const eveningRange = hour >= 19;
 
     return morningRange || afternoonRange || eveningRange;
   };

  const handleSubmit = async () => {
    let updatedSugar = calculateSugar(sugarValue, activeSweet, activeQuantitie);

    const formatDate = getFormattedDate()

    const dailySugarData: DailySugar = {
      date: formatDate,
      value: updatedSugar
    }

    const beverageData: BeverageData = {
      menu: menu,
      img: img,
      value: updatedSugar,
      quantities:
        activeQuantitie !== null
          ? ["100%", "75%", "50%", "25%"][activeQuantitie]
          : "-",
      sweetLevel: activeSweet !== null ? sweetLevel[activeSweet] : "-",
      createAt: formatDate
    };

    handleModalClose();

    await Promise.all([
      postData(dailySugarData, 'submitSugar'),
      postData(beverageData, 'submitBeverage')
    ])

    toast.dismiss()
    toast.success("บันทึกข้อมูลสำเร็จ")

    if (checkTimeInRange()) {
      Swal.fire({
        icon: 'info',
        title: 'เวลานี้เป็นเวลานอกมื้ออาหาร!',
        text: 'หลังจากดื่มนํ้าหวานควรดื่มนํ้าเปล่าตามมากๆ หรือแปรงฟันให้สะอาด',
      });
    }
  };

  return (
    <div className="bg-black bg-opacity-30 w-screen h-screen fixed top-0 left-0 z-[60] flex-center">
      <div className="bg-white rounded-xl w-full relative mx-4 px-4 py-6">
        <IoIosCloseCircle
          size={28}
          color="#4F80C0"
          className="absolute top-2 right-2"
          onClick={handleModalClose}
        />
        <div className="flex flex-col justify-center items-center gap-2">
          <Image src={img} alt={`${img}`} width={80} height={80} />
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-2xl text-darkBlue text-center text-balance">{menu}</h2>
            <a className='text-gray-500 text-lg font-medium'>{volume} ml</a>
          </div>
        </div>
        <div className="space-y-4 pt-4">
          {/* sweetLevel */}
          {sweetSelect &&(
            <div className="space-y-2">
            <h3 className="text-xl text-darkBlue">ความหวาน</h3>
            <div className="flex items-center justify-between">
              {sweetLevel.map((level, index) => (
                <div key={index}>
                  <SelectButton
                    title={level}
                    className={`w-[80px] ${activeSweet === index
                        ? "bg-buttonActive border-darkBlue text-darkBlue"
                        : ""
                      }`}
                    onClick={() => handleSweetLevelButton(index)}
                  />
                </div>
              ))}
            </div>
          </div>
          )}

          {/* Quantitie Level */}
          <div className="space-y-2">
            <h3 className="text-xl text-darkBlue">ปริมาณที่ดื่ม</h3>
            <div className="flex items-center justify-between">
              {quantitieLevel.map((items, index) => (
                <div key={index}>
                  <SelectButton
                    title={items.quantities}
                    icon={
                      activeQuantitie === index ? items.iconActive : items.icon
                    }
                    className={`w-[80px] ${activeQuantitie === index
                        ? "bg-buttonActive border-darkBlue text-darkBlue"
                        : ""
                      } ${sweetSelect && activeSweet === null ? "opacity-50" : ""}`}
                    onClick={() => handleQuantitieLevelButton(index)}
                    disable={sweetSelect ? activeSweet === null : false }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`${(sweetSelect && activeSweet === null) || activeQuantitie === null ? "opacity-50" : ""
            } flex-center pt-8`}
        >
          <button
            className="bg-gradient-to-r from-blue to-darkBlue text-white rounded-xl w-[80%] py-2 font-medium text-xl"
            onClick={handleSubmit}
            disabled={(sweetSelect && activeSweet === null) || activeQuantitie === null}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
});

export default AddBeverageModal;