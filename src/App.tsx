import React, { useEffect, useState } from "react";
import { supabase } from "./utils/api";
import { Lesson, Slot } from "./types/lesson.types.ts";
import { orderedDays, timeSlots } from "./utils/constants.ts";
import { DaySelector } from "./components/DaySelector";
import { PersonSelector } from "./components/PersonSelector";
import { DayCard } from "./components/DayCard";

const App: React.FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedPerson, setSelectedPerson] = useState<"Все" | "Ерасыл" | "Асёка">("Все");

    useEffect(() => {
        const savedPerson = localStorage.getItem("selectedPerson");
        if (savedPerson === "Ерасыл" || savedPerson === "Асёка") setSelectedPerson(savedPerson);

        const fetchData = async () => {
            try {
                const { data } = await supabase.from("schedule").select("*");
                if (data) setLessons(data);
            } catch (e) { console.error(e); }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedPerson", selectedPerson);
    }, [selectedPerson]);



    const grouped = orderedDays.map((dayName) => {
        const slots: Slot[] = timeSlots.map((slot) => {
            const yerassyl: Lesson | null =
                selectedPerson === "Асёка" ? null : lessons.find((l) => l.day === dayName && l.time_slot === slot && l.person === "Ерасыл") || null;
            const asel: Lesson | null =
                selectedPerson === "Ерасыл" ? null : lessons.find((l) => l.day === dayName && l.time_slot === slot && l.person === "Асёка") || null;
            return { slot, yerassyl, asel };
        });

        const firstIndex = slots.findIndex((s: Slot) => s.yerassyl || s.asel);
        const lastIndex = slots.map((s: Slot) => !!(s.yerassyl || s.asel)).lastIndexOf(true);
        return { label: dayName, slots: firstIndex === -1 ? [] : slots.slice(firstIndex, lastIndex + 1) };
    });

    const visibleDays = selectedDay ? grouped.filter((d) => d.label === selectedDay) : grouped;

    if (loading) return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="card bg-base-100 shadow-2xl">
                <div className="card-body items-center text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <h2 className="card-title text-base-content text-base sm:text-lg md:text-xl">Загрузка расписания...</h2>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
                <DaySelector selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
                <PersonSelector selectedPerson={selectedPerson} setSelectedPerson={setSelectedPerson} />
                <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {visibleDays.map((day) => day.slots.length > 0 && <DayCard key={day.label} label={day.label} slots={day.slots} selectedPerson={selectedPerson} />)}
                </div>
            </div>
        </div>
    );
};

export default App;
