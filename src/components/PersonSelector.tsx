import React from "react";

type Props = {
    selectedPerson: "Все" | "Ерасыл" | "Асёка";
    setSelectedPerson: (person: "Все" | "Ерасыл" | "Асёка") => void;
};

export const PersonSelector: React.FC<Props> = ({ selectedPerson, setSelectedPerson }) => (
    <div className="flex flex-wrap gap-2 justify-center mb-4 sm:mb-6">
        {["Все", "Ерасыл", "Асёка"].map((p) => (
            <button
                key={p}
                className={`btn btn-xs sm:btn-sm ${selectedPerson === p ? "btn-secondary" : "btn-outline"}`}
                onClick={() => setSelectedPerson(p as typeof selectedPerson)}
            >
                {p}
            </button>
        ))}
    </div>
);
