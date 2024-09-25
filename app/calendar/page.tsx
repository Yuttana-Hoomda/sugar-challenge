'use client'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './custom-calender.css';

interface DailySugar {
    date: string; // ใช้ string เพื่อให้สามารถแปลงเป็น Date ได้
    value: number; // ใช้ number แทน Number
}

export default function CalendarPage() {
    //   const { data: session } = useSession(); // ดึงข้อมูล session
    //   const [dailySugar, setDailySugar] = useState<DailySugar[]>([]); // กำหนดประเภท

    //   useEffect(() => {
    //     const fetchDailySugar = async () => {
    //       if (!session || !session.user) return; // ตรวจสอบว่า session มีหรือไม่

    //       const email = session.user.email; // ดึง email ของผู้ใช้
    //       const response = await fetch(`/api/dailysugar?email=${email}`);
    //       if (response.ok) {
    //         const data = await response.json();
    //         setDailySugar(data);
    //       }
    //     };

    //     fetchDailySugar();
    //   }, [session]); // ให้ useEffect ทำงานใหม่เมื่อ session เปลี่ยนแปลง

    const [dailySugar, setDailySugar] = useState<DailySugar[]>([]);
    const [isClient, setIsClient] = useState(false);

    // useEffect(() => {
    //     setIsClient(true);
    //     const mockDailySugar: DailySugar[] = [
    //         { date: '2024-09-22', value: 15 },
    //         { date: '2024-09-23', value: 25 },
    //         { date: '2024-09-24', value: 10 },
    //         { date: '2024-09-25', value: 22 },
    //     ];
    //     setDailySugar(mockDailySugar);
    // }, []);


    const tileClassName = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const dateStr = date.toISOString().split('T')[0]; // แปลงวันที่เป็นสตริงในรูปแบบ YYYY-MM-DD
            const sugarEntry = dailySugar.find(entry => entry.date === dateStr);

            if (sugarEntry) {
                return sugarEntry.value > 20 ? 'bg-red' : 'bg-green'; // กำหนดสีพื้นหลัง
            }
        }
        return null; // ไม่มีการกำหนดสีถ้าไม่มีข้อมูล
    };

    if (!isClient) {
        return <div className="flex justify-center">Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-center rounded-xl">
                <Calendar
                    tileClassName={tileClassName} // ใช้ tileClassName
                    className="custom-calendar"
                    onChange={() => { }} // ไม่ทำอะไรเมื่อมีการเลือกวันที่
                />
            </div>
        </div>
    );
}

// 'use client'
// import { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
// import './custom-calender.css';

// interface DailySugar {
//   date: string;
//   value: number;
// }

// export default function CalendarPage() {
//   const { data: session } = useSession();
//   const [dailySugar, setDailySugar] = useState<DailySugar[]>([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchDailySugar = async () => {
//       if (!session || !session.user) return;
//       const email = session.user.email;
//       const response = await fetch(`/api/dailysugar?email=${email}`);
//       if (response.ok) {
//         const data = await response.json();
//         setDailySugar(data);
//       }
//       setIsLoading(false);
//     };

//     fetchDailySugar();
//   }, [session]);

//   const tileClassName = ({ date, view }: { date: Date; view: string }) => {
//     if (view === 'month') {
//       const dateStr = date.toISOString().split('T')[0];
//       const sugarEntry = dailySugar.find(entry => entry.date === dateStr);
//       if (sugarEntry) {
//         return sugarEntry.value > 20 ? 'bg-red' : 'bg-green';
//       }
//     }
//     return null;
//   };

//   if (isLoading) {
//     return <div className="flex justify-center">Loading...</div>;
//   }

//   return (
//     <div>
//       <div className="flex justify-center rounded-xl">
//         <Calendar
//           tileClassName={tileClassName}
//           className="custom-calendar"
//           onChange={() => {}}
//         />
//       </div>
//     </div>
//   );
// }
