import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './custom-calender.css';

//npm install react-calendar ด้วยนะจ๊ะ

export default async function CalendarPage() {

    return (
        <div>
        <div className="flex justify-center rounded-xl">
            <Calendar
                className="custom-calendar"    
            />
        </div>
        </div>
    );
}
