'use client';
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './custom-calender.css';

interface DailySugar {
    date: string;
    value: number;
}

export default function CalendarPage() {
    const [dailySugar, setDailySugar] = useState<DailySugar[]>([]);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const mockDailySugar: DailySugar[] = [
            { date: '2024-10-22', value: 15 },
            { date: '2024-10-23', value: 25 },
            { date: '2024-10-24', value: 10 },
            { date: '2024-10-25', value: 22 },
            { date: '2024-10-26', value: 20 },
            { date: '2024-10-27', value: 14 },
        ];
        setDailySugar(mockDailySugar);
    }, []);

    const tileClassName = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const dateStr = date.toISOString().split('T')[0];
            const sugarEntry = dailySugar.find(entry => entry.date === dateStr);
            if (sugarEntry) {
                return sugarEntry.value > 20 ? 'bg-red' : 'bg-green';
            }
        }
        return null;
    };

    if (!isClient) {
        return <div className="flex justify-center">Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-center rounded-xl">
                <Calendar
                    tileClassName={tileClassName}
                    className="custom-calendar"
                    onChange={() => {}}
                />
            </div>
        </div>
    );
}
