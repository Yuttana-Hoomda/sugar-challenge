"use client";

//npm i react@latest react-dom@latest
//npm install chart.js react-chartjs-2
//npm install chartjs-plugin-zoom
import React, { useState, useEffect } from "react";
import "chartjs-plugin-zoom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
//test
import { ChartOptions } from "chart.js/auto";

interface GraphProps {
    monthView: { month: number; year: number };
}

const Graph: React.FC<GraphProps> = ({ monthView }) => {
  const [graphData, setGraphData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "ปริมาณน้ำตาล",
        data: [],
        fill: false,
        backgroundColor: "rgba(79, 128, 192, 1)",
        borderColor: "rgba(79, 128, 192, 1)",
        tension: 0.1, // Smooth the lines
      },
    ],
  });

  // คำนวณค่าที่ต้องการ
    const dataValues = graphData.datasets[0].data.filter((value: number) => !isNaN(value) && value !== undefined);
    const maxValue = dataValues.length > 0 ? Math.max(...dataValues) : 0;
    const averageValue = dataValues.reduce((a: number, b: number) => a + b, 0) / dataValues.length;
  const halfValue = maxValue / 2;

  // ปรับโครงสร้าง options ให้ตรงกับ Chart.js 3 ขึ้นไป
  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        suggestedMax: maxValue * 1.1, // เผื่อพื้นที่ด้านบน
        suggestedMin: 0,
        beginAtZero: true,
        },
      },
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
  };

  const parseData = (data: { date: string; value: number }[]): { labels: string[]; data: number[] } => {
    // เรียงข้อมูลตามวันที่จากน้อยไปมาก
    const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
    const labels = sortedData.map((item) => new Date(item.date).getDate().toString());
    const sugarData = sortedData.map((item) => item.value);
  
    return { labels, data: sugarData };
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getDailysugar");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // ตรวจสอบว่า data.dailySugar เป็นอาร์เรย์ก่อน
        if (Array.isArray(data.dailySugar)) {
            // กรองข้อมูลให้เหลือเฉพาะเดือนและปีที่เลือก
            const filteredData = data.dailySugar.filter((item: { date: string | number | Date; }) => {
                const itemDate = new Date(item.date);
                return (
                    itemDate.getMonth() === monthView.month &&
                    itemDate.getFullYear() === monthView.year
                );
            });

            // แปลงและตั้งค่าข้อมูลที่กรองแล้วสำหรับกราฟ
            const parsedData = parseData(filteredData); // ส่งเฉพาะข้อมูลที่กรองแล้วเท่านั้น
            setGraphData({
                labels: parsedData.labels,
                datasets: [
                    {
                        ...graphData.datasets[0],
                        data: parsedData.data,
                    },
                ],
            });
        } else {
            console.error("Expected dailySugar to be an array:", data.dailySugar);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

fetchData();
}, [monthView]); // เพิ่ม monthView เป็น dependency เพื่อดึงข้อมูลใหม่เมื่อมีการเปลี่ยนแปลง

  return (
    <div className="flex-col">
      <div className="flex justify-center">
        <h2 className="text-blue-800"> กราฟค่าน้ำตาลรายวัน</h2>
      </div>
      <Line data={graphData} options={options} className="m-2" />
    </div>
  );
};

export default Graph;

