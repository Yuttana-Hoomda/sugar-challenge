'use client';
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './custom-calender.css';
import Graph from "@/components/Graph";

interface DailySugar {
    date: string;
    value: number;
}

export default function CalendarPage() {
    const [dailySugar, setDailySugar] = useState<DailySugar[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

    const handleMonthChange = (date: Date) => {
        setSelectedMonth(date);
    };    

    useEffect(() => {
        const fetchDailySugar = async () => {
            try {
                const response = await fetch("/api/getDailysugar");
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setDailySugar(data.dailySugar);
                }
            } catch (error) {
                console.error("Error fetching dailySugar data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDailySugar();
    }, []);
    
    // useEffect(() => {
    //     const fetchDailySugar = async () => {
    //         try {
    //             setIsLoading(true);
    //             const response = await fetch("/api/getDailysugar");
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setDailySugar(data.dailySugar);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching dailySugar data:", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    
    //     fetchDailySugar();
    // }, []);  // เรียกครั้งเดียวตอนโหลดหน้า
    

    const formatDate = (date: Date): string => {
        // ใช้ timezone ของผู้ใช้ในการแสดงผล
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
        return adjustedDate.toISOString().split('T')[0];
    };

    const tileClassName = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const dateStr = formatDate(date);
            console.log('Checking date:', dateStr); // Debug log

            const sugarEntry = dailySugar.find(entry => {
                // แปลง date string จาก MongoDB เป็น Date object
                const entryDate = new Date(entry.date);
                const entryDateStr = formatDate(entryDate);
                console.log('Comparing with entry date:', entryDateStr); // Debug log
                return dateStr === entryDateStr;
            });
            if (sugarEntry) {
                return sugarEntry.value > 24 ? 'bg-red' : 'bg-green';
            }
        }
        return null;
    };

    if (isLoading) {
        return <div className="flex justify-center">Loading...</div>;
    }

    return (
        <div>
            <div className="flex-col justify-center rounded-xl">
                <Calendar
                    tileClassName={tileClassName}
                    className="custom-calendar"
                    onChange={() => {}}
                />
                <div className="m-5">
                    <Graph 
                        // data={dailySugar} 
                        // selectedMonth={selectedMonth}
                    />
                </div>
            </div>
        </div>
    );
}
