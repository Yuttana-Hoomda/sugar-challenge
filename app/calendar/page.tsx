'use client';
import { useState, useEffect } from "react";
import Calendar, { CalendarProps } from "react-calendar";
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
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [monthView, setMonthView] = useState({ month: new Date().getMonth(), year: new Date().getFullYear() });
    //!
    const handleMonthChange = (activeStartDate: Date) => {
        // อัปเดต monthView
        setMonthView({
            month: activeStartDate.getMonth(),
            year: activeStartDate.getFullYear(),
        });

        // อัปเดต currentMonth
        setCurrentMonth(activeStartDate);
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


    const formatDate = (date: Date): string => {
        // ใช้ timezone ของผู้ใช้ในการแสดงผล
        const offset = date.getTimezoneOffset();
        const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
        return adjustedDate.toISOString().split('T')[0];
    };

    const tileClassName = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {

            const isCurrentMonth = date.getMonth() === currentMonth.getMonth() &&
                date.getFullYear() === currentMonth.getFullYear();

            if (!isCurrentMonth) {
                return null; // Return null for dates not in current month
            }

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
    // pp Code
    // const handleMonthChange = (value: Date) => {
    //     setCurrentMonth(value);
    // };

    if (isLoading) {
        return <div className="flex justify-center">Loading...</div>;
    }

    return (
        <div>
            {typeof window !== 'undefined' && (
                <div className="flex flex-col justify-center items-center rounded-xl">
                    <Calendar
                        tileClassName={tileClassName}
                        className="custom-calendar"
                        onChange={() => { }}
                        onActiveStartDateChange={({ activeStartDate }) => {
                            if (activeStartDate) {
                                handleMonthChange(activeStartDate);
                            }
                        }}
                    />
                    <div className="m-5">
                        <Graph monthView={monthView} />
                    </div>
                </div>
            )}
        </div>
    );
}
