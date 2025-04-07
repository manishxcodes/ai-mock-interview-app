import { useEffect, useState } from "react";

export const Darktheme = () => {
    const [darkmode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(savedMode);
        document.documentElement.classList.toggle("dark", savedMode);
    }, [])

    const toggleDarkMode = () => {
        const newMode = !darkmode;
        setDarkMode(newMode);
        document.documentElement.classList.toggle("dark", newMode);
        localStorage.setItem("darkMode", newMode.toString());
    }

  return (
    <div>
        <button title="theme-toggle" className="inline-flex items-center justify-center py-1 px-1 opacity-75 hover:opacity-100  cursor-pointer" onClick={toggleDarkMode}>
            <span className="flex items-center justify-center h-[30px] w-[40px] rounded-sm hover:bg-gray-100  dark:hover:bg-white/15 transition-opacity text-gray-600 dark:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="-3 -3 30 30" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="-2 0 28 28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>
              </span>
            </button>
    </div>
  )
}
