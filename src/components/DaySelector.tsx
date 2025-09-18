import React, {useEffect} from "react";
import { orderedDays, dayShort } from "../utils/constants.ts";

type Props = {
    selectedDay: string | null;
    setSelectedDay: (day: string | null) => void;
};

export const DaySelector: React.FC<Props> = ({ selectedDay, setSelectedDay }) => {
    useEffect(() => {
        const today = new Date().getDay();
        if (today === 0) {
            setSelectedDay(null);
        } else {
            const day = orderedDays[today - 1];
            setSelectedDay(day);
        }
    }, [setSelectedDay]);
    return (
        <div className="flex flex-wrap gap-2 justify-center mb-4 sm:mb-6">
            <button
                className={`btn btn-xs sm:btn-sm ${selectedDay === null ? "btn-primary" : "btn-outline"}`}
                onClick={() => setSelectedDay(null)}
            >
                Все дни
            </button>
            {orderedDays.map((day) => (
                <button
                    key={day}
                    className={`btn btn-xs sm:btn-sm ${selectedDay === day ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setSelectedDay(day)}
                >
                    {dayShort[day]}
                </button>
            ))}
        </div>
    );
};
