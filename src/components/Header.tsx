import { Moon, Sun} from "lucide-react";
import { useEffect, useState } from "react";
import { themeChange } from "theme-change";


export default function Header() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        themeChange(false);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <header className="flex justify-between bg-base-100 shadow-sm px-4 py-2">
            <div className="text-sm sm:text-base">
            </div>
            <div>
                <label className="swap swap-rotate">
                    <input
                        type="checkbox"
                        onChange={toggleTheme}
                        checked={theme === "dark"}
                        data-set-theme={theme === "light" ? "dark" : "light"}
                    />
                    <Moon className="swap-off h-5 w-5" />
                    <Sun className="swap-on h-5 w-5" />
                </label>
            </div>
        </header>
    );
}
