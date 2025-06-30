import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(
        () => localStorage.getItem("theme") || "dark"
    );

    useEffect(() => {
        // Xóa các class theme cũ và thêm class theme hiện tại vào <html>
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme); // Lưu theme vào localStorage
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
