import React, {useEffect, useState} from "react";
import {supabase} from "./utils/api.ts";

type Lesson = {
    id: number;
    day: string;
    time_slot: string;
    person: string;
    subject: string;
    teacher: string;
    classroom: string;
    type: string;
};

const dayShort: Record<string, string> = {
    "Понедельник": "Пн",
    "Вторник": "Вт",
    "Среда": "Ср",
    "Четверг": "Чт",
    "Пятница": "Пт",
    "Суббота": "Сб",
};

const personBackgrounds = {
    "Ерасыл": "images/toothless.jpg",
    "Асель": "images/Cinnamoroll.jpg"
};

const App: React.FC = () => {
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedPerson, setSelectedPerson] = useState<"Все" | "Ерасыл" | "Асель">("Все");

    const orderedDays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const timeSlots = [
        "08:00 - 08:50",
        "09:00 - 09:50",
        "10:00 - 10:50",
        "11:00 - 11:50",
        "12:10 - 13:00",
        "13:10 - 14:00",
        "14:10 - 15:00",
        "15:10 - 16:00",
        "16:10 - 17:00",
        "17:20 - 18:10",
        "18:30 - 19:20",
        "19:30 - 20:20",
        "20:30 - 21:20",
        "21:30 - 22:20",
    ];

    useEffect(() => {
        // Загружаем выбранного человека из localStorage
        const savedPerson = localStorage.getItem("selectedPerson");
        if (savedPerson === "Ерасыл" || savedPerson === "Асель") {
            setSelectedPerson(savedPerson);
        }

        const fetchData = async () => {
            try {
                const {data} = await supabase.from("schedule").select("*");
                if (data) {
                    setLessons(data);
                    setLoading(false);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    // Сохраняем выбранного человека в localStorage
    useEffect(() => {
        localStorage.setItem("selectedPerson", selectedPerson);
    }, [selectedPerson]);

    const grouped = orderedDays.map((dayName) => {
        const slots = timeSlots.map((slot) => {
            const yerassyl = lessons.find(
                (l) => l.day === dayName && l.time_slot === slot && l.person === "Ерасыл"
            );
            const asel = lessons.find(
                (l) => l.day === dayName && l.time_slot === slot && l.person === "Асель"
            );
            return {slot, yerassyl, asel};
        });

        const firstIndex = slots.findIndex((s) => s.yerassyl || s.asel);
        const lastIndex = slots.map((s) => !!(s.yerassyl || s.asel)).lastIndexOf(true);

        const filtered = firstIndex === -1 ? [] : slots.slice(firstIndex, lastIndex + 1);

        return {
            label: dayName,
            slots: filtered,
        };
    });

    const getTypeBadgeClass = (type: string) => {
        const badges = {
            "Лекция": "badge-info",
            "Практика": "badge-warning",
        };
        return badges[type as keyof typeof badges] || "badge-neutral";
    };

    const getPersonCardStyle = (person: "Ерасыл" | "Асель", hasLesson: boolean) => {
        if (!hasLesson) {
            return {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
            };
        }

        const backgroundImage = personBackgrounds[person];
        return {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: 'white',
        };
    };

    const visibleDays = selectedDay ? grouped.filter((d) => d.label === selectedDay) : grouped;

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <div className="card bg-base-100 shadow-2xl">
                    <div className="card-body items-center text-center">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                        <h2 className="card-title text-base-content text-base sm:text-lg md:text-xl">
                            Загрузка расписания...
                        </h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
                <div className="flex flex-wrap gap-2 justify-center mb-4 sm:mb-6">
                    <button
                        className={`btn btn-xs sm:btn-sm ${
                            selectedDay === null ? "btn-primary" : "btn-outline"
                        }`}
                        onClick={() => setSelectedDay(null)}
                    >
                        Все дни
                    </button>
                    {orderedDays.map((day) => (
                        <button
                            key={day}
                            className={`btn btn-xs sm:btn-sm ${
                                selectedDay === day ? "btn-primary" : "btn-outline"
                            }`}
                            onClick={() => setSelectedDay(day)}
                        >
                            {dayShort[day]}
                        </button>
                    ))}
                </div>

                <div className="flex flex-wrap gap-2 justify-center mb-4 sm:mb-6">
                    {["Все", "Ерасыл", "Асель"].map((p) => (
                        <button
                            key={p}
                            className={`btn btn-xs sm:btn-sm ${
                                selectedPerson === p ? "btn-secondary" : "btn-outline"
                            }`}
                            onClick={() => setSelectedPerson(p as typeof selectedPerson)}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
                    {visibleDays.map(
                        (day) =>
                            day.slots.length > 0 && (
                                <div key={day.label} className="bg-base-100 shadow rounded-xl overflow-hidden">
                                    <div className="bg-primary p-2 sm:p-3 text-center">
                                        <h2 className="text-primary-content text-sm sm:text-base font-bold">
                                            {day.label}
                                        </h2>
                                    </div>

                                    <div className="divide-y divide-base-300">
                                        {day.slots.map(({slot, yerassyl, asel}) => (
                                            <div key={slot} className="p-2 sm:p-3">
                                                <div className="text-xs sm:text-sm text-accent font-medium mb-1">
                                                    {slot}
                                                </div>

                                                <div
                                                    className={`grid ${
                                                        selectedPerson === "Все" ? "grid-cols-2 gap-2" : "grid-cols-1"
                                                    }`}
                                                >
                                                    {(selectedPerson === "Все" || selectedPerson === "Ерасыл") && (
                                                        <div
                                                            className="p-2 rounded-lg"
                                                            style={getPersonCardStyle("Ерасыл", !!yerassyl)}
                                                        >
                                                            <div className="text-[10px] font-semibold mb-1 text-white">Ерасыл</div>
                                                            {yerassyl ? (
                                                                <>
                                                                    <div className="font-bold text-xs sm:text-sm mb-1 text-white">
                                                                        {yerassyl.subject}
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-1 mb-1">
                                    <span
                                        className={`badge badge-xs sm:badge-sm ${getTypeBadgeClass(
                                            yerassyl.type
                                        )}`}
                                    >
                                      {yerassyl.type}
                                    </span>
                                                                        <span
                                                                            className="badge badge-outline badge-xs sm:badge-sm bg-white/20 border-white/40 text-white">
                                      {yerassyl.classroom}
                                    </span>
                                                                    </div>
                                                                    <div className="text-[10px] sm:text-xs opacity-90 text-white">
                                                                        {yerassyl.teacher}
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="text-[10px] text-base-content opacity-60">Свободно</div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {(selectedPerson === "Все" || selectedPerson === "Асель") && (
                                                        <div
                                                            className="p-2 rounded-lg"
                                                            style={getPersonCardStyle("Асель", !!asel)}
                                                        >
                                                            <div className="text-[10px] font-semibold mb-1 text-white">Асель</div>
                                                            {asel ? (
                                                                <>
                                                                    <div className="font-bold text-xs sm:text-sm mb-1 text-white">
                                                                        {asel.subject}
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-1 mb-1">
                                    <span
                                        className={`badge badge-xs sm:badge-sm ${getTypeBadgeClass(
                                            asel.type
                                        )}`}
                                    >
                                      {asel.type}
                                    </span>
                                                                        <span
                                                                            className="badge badge-outline badge-xs sm:badge-sm bg-white/20 border-white/40 text-white">
                                      {asel.classroom}
                                    </span>
                                                                    </div>
                                                                    <div className="text-[10px] sm:text-xs opacity-90 text-white">
                                                                        {asel.teacher}
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="text-[10px] text-base-content opacity-60">Свободно</div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;