import React from "react";
import { Lesson } from "../types/lesson.types.ts";
import { LessonCard } from "./LessonCard";

type Slot = { slot: string; yerassyl: Lesson | null; asel: Lesson | null };
type Props = { label: string; slots: Slot[]; selectedPerson: "Все" | "Ерасыл" | "Асёка" };

export const DayCard: React.FC<Props> = ({ label, slots, selectedPerson }) => (
    <div className="bg-base-100 shadow rounded-xl overflow-hidden">
        <div className="bg-primary p-2 sm:p-3 text-center">
            <h2 className="text-primary-content text-sm sm:text-base font-bold">{label}</h2>
        </div>
        <div className="divide-y divide-base-300">
            {slots.map(({ slot, yerassyl, asel }) => (
                <div key={slot} className="p-2 sm:p-3">
                    <div className="text-xs sm:text-sm text-accent font-medium mb-1">{slot}</div>
                    <div className={`grid ${selectedPerson === "Все" ? "grid-cols-2 gap-2" : "grid-cols-1"}`}>
                        {(selectedPerson === "Все" || selectedPerson === "Ерасыл") && <LessonCard lesson={yerassyl} person="Ерасыл" />}
                        {(selectedPerson === "Все" || selectedPerson === "Асёка") && <LessonCard lesson={asel} person="Асёка" />}
                    </div>
                </div>
            ))}
        </div>
    </div>
);
