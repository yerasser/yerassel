import React from "react";
import { Lesson } from "../types/lesson.types.ts";
import { personBackgrounds } from "../utils/constants.ts";

type Props = {
    lesson: Lesson | null;
    person: "Ерасыл" | "Асель";
};

export const LessonCard: React.FC<Props> = ({ lesson, person }) => {
    const getTypeBadgeClass = (type: string) => {
        const badges = { "Лекция": "badge-info", "Практика": "badge-warning" };
        return badges[type as keyof typeof badges] || "badge-neutral";
    };

    const style = lesson
        ? {
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${personBackgrounds[person]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            color: "white",
        }
        : { backgroundColor: "rgba(255,255,255,0.1)" };

    return (
        <div className="p-2 rounded-lg" style={style}>
            <div className="text-[10px] font-semibold mb-1">{person}</div>
            {lesson ? (
                <>
                    <div className="font-bold text-xs sm:text-sm mb-1">{lesson.subject}</div>
                    <div className="flex flex-wrap gap-1 mb-1">
                        <span className={`badge badge-xs sm:badge-sm ${getTypeBadgeClass(lesson.type)}`}>{lesson.type}</span>
                        <span className="badge badge-outline badge-xs sm:badge-sm bg-white/20 border-white/40">{lesson.classroom}</span>
                    </div>
                    <div className="text-[10px] sm:text-xs opacity-90">{lesson.teacher}</div>
                </>
            ) : (
                <div className="text-[10px] opacity-60">Свободно</div>
            )}
        </div>
    );
};
