import Image from "next/image";
import React, { useState } from "react";
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

interface AddBeverageModalProps {
  menu: string;
  img: any;
  handleOpen: boolean;
  handleClose: () => void;
  sugarValue: number;
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

const AddBeverageModal: React.FC<AddBeverageModalProps> = ({
  menu,
  img,
  sugarValue,
  handleOpen,
  handleClose,
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

  const sweetLevel = ["หวานน้อย", "หวานปกติ", "หวานมาก"];
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
    switch (activeSweet) {
      case 0:
        updatedSugar = sugarValue / 2;
        break;
      case 1:
        updatedSugar = sugarValue;
        break;
      case 2:
        updatedSugar = sugarValue * 1.5;
        break;
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

  const submitSugarData = async ({ date, value }: SubmitSugarDataParams) => {
    try {
      const response = await fetch("/api/submitSugar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, value }),
      });

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const submitBeverageHistory = async (beverageData: BeverageData) => {
    try {
      const response = await fetch("/api/submitBeverage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(beverageData),
      });

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSubmit = async () => {
    let updatedSugar = calculateSugar(sugarValue, activeSweet, activeQuantitie);

    const getFormattedDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const formatDate = getFormattedDate()

    const BeverageData: BeverageData = {
      menu: menu,
      img: img.src,
      value: updatedSugar,
      quantities:
        activeQuantitie !== null
          ? ["100%", "75%", "50%", "25%"][activeQuantitie]
          : "100%",
      sweetLevel: activeSweet !== null ? sweetLevel[activeSweet] : "หวานปกติ",
      createAt: formatDate
    };

    await submitSugarData({ date: formatDate, value: updatedSugar });
    await submitBeverageHistory(BeverageData)
    toast.success("บันทึกข้อมูลสำเร็จ")
    handleModalClose();
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
          <h2 className="font-bold text-3xl text-darkBlue">{menu}</h2>
        </div>
        <div className="space-y-4 pt-4">
          {/* sweetLevel */}
          <div className="space-y-2">
            <h3 className="text-xl text-darkBlue">ความหวาน</h3>
            <div className="flex items-center gap-2">
              {sweetLevel.map((level, index) => (
                <div key={index}>
                  <SelectButton
                    title={level}
                    className={`w-[90px] ${activeSweet === index
                        ? "bg-buttonActive border-darkBlue text-darkBlue"
                        : ""
                      }`}
                    onClick={() => handleSweetLevelButton(index)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quantitie Level */}
          <div className="space-y-2">
            <h3 className="text-[18px] text-darkBlue">ปริมาณที่ดื่ม</h3>
            <div className="flex items-center justify-between">
              {quantitieLevel.map((items, index) => (
                <div key={index}>
                  <SelectButton
                    title={items.quantities}
                    icon={
                      activeQuantitie === index ? items.iconActive : items.icon
                    }
                    className={`w-[75px] ${activeQuantitie === index
                        ? "bg-buttonActive border-darkBlue text-darkBlue"
                        : ""
                      } ${activeSweet === null ? "opacity-50" : ""}`}
                    onClick={() => handleQuantitieLevelButton(index)}
                    disable={activeSweet === null}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`${activeSweet === null || activeQuantitie === null ? "opacity-50" : ""
            } flex-center pt-8`}
        >
          <button
            className="bg-gradient-to-r from-blue to-darkBlue text-white rounded-xl w-[80%] py-2 font-medium text-xl"
            onClick={handleSubmit}
            disabled={activeSweet === null || activeQuantitie === null}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBeverageModal;