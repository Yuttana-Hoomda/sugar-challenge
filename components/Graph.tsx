"use client";

//npm i react@latest react-dom@latest
//npm install chart.js react-chartjs-2
//npm install axios
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
//test
import { Data } from "./DataTest";
import { ChartOptions } from "chart.js/auto";

const Graph = () => {
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
  const dataValues = graphData.datasets[0].data;
  const maxValue = Math.max(...dataValues);
  const averageValue =
    dataValues.reduce((a: number, b: number) => a + b, 0) / dataValues.length;
  // console.log(averageValue)
  const halfValue = maxValue / 2;

  // ปรับโครงสร้าง options ให้ตรงกับ Chart.js 3 ขึ้นไป
  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            const isStart = value === "1";
            const isMiddle = value === "15";
            const isEnd = index === values.length - 1;

            if (isStart || isMiddle || isEnd) {
              return value;
            }
            return null; // ซ่อนวันที่อื่นๆ
          },
        },
      },
      y: {
        ticks: {
          callback: function (value: number | string) {
            if (value === 0 || value === maxValue || value === halfValue) {
              return value; // แสดงเฉพาะค่า 0, ค่าสูงสุด, และค่าเฉลี่ย
            }
            return "";
          },
        },
        suggestedMax: maxValue + maxValue * 0.1, // กำหนดค่าสูงสุดของแกน Y พร้อมเพิ่มเผื่อ
        suggestedMin: 0, // กำหนดค่าเริ่มต้นเป็น 0 พร้อมเพิ่มเผื่อ
        grid: {
          color: (ctx) => {
            // สร้างเส้นกริดเฉพาะค่าสำคัญ
            const tickValue = ctx.tick.value; // ใช้ ctx.tick.value
            if (
              tickValue === 0 ||
              tickValue === maxValue ||
              tickValue === halfValue
            ) {
              return "rgba(172, 171, 171, 1)"; // สีเส้นกริดที่แสดง
            }
            return "rgba(0, 0, 0, 0)"; // สีเส้นกริดที่ซ่อน
          },
        },
        beginAtZero: true,
      },
    },
  };


  const parseData = (data: { date: string; value: number }[]): { labels: string[]; data: number[] } => {
    const labels: string[] = [];
    const sugarData: number[] = [];

    data.forEach((item) => {
        const itemDate = new Date(item.date);
        console.log(itemDate);
        labels.push(itemDate.getDate().toString()); // ดึงเฉพาะวันที่
        sugarData.push(item.value); // ใส่ค่า value
    });

    return { labels, data: sugarData };
};


useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch("/api/getDailysugar");
            if (response.ok) {
                const data = await response.json();
                const parsedData = parseData(data); // ใช้ฟังก์ชัน parseData
                console.log(parsedData); // ตรวจสอบข้อมูลใน console

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
                console.error("Failed to fetch data:", response.status);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchData();
}, []);

  return (
    <div className="flex-col">
      <div className="flex justify-center">
        <h2 className="text-blue-800"> กราฟค่าน้ำตาลรายวัน</h2>
      </div>
      <Line data={graphData} options={options} className="m-2"/>
    </div>
  );
};

export default Graph;
