import React, { createContext, useContext, useState } from 'react';

// Define your themes here
const themes = {
    light: {
        primary100: '#e0e7ff',
        primary500: '#6366f1',
        primary800: '#1e1b4b',
        error100: '#fee2e2',
        error400: "#f87171",
        error500: '#ef4444',
    },
    dark: {
        primary100: '#1e1b4b',
        primary500: '#6366f1',
        primary800: '#e0e7ff',
        error100: '#fee2e2',
        error400: "#f87171",
        error500: '#ef4444',
    },
};

const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => { },
    colors: themes.dark, // Default to light theme
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const colors = themes[theme];

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
};