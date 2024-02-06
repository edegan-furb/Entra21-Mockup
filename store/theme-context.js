import React, { createContext, useContext, useState } from 'react';

// Define your themes here
const themes = {
    light: {
        error100: '#ffc6c6',
        error400: "#f87171",
        error500: '#ef4444',

        //  Violet
        primary50: "#f5f3ff",
        primary100: "#ede9fe",
        primary200: "#ddd6fe",
        primary300: "#c4b5fd",
        primary400: "#a78bfa",
        primary500: "#8b5cf6",
        primary600: "#7c3aed",
        primary700: "#6d28d9",
        primary800: "#5b21b6",
        primary900: "#4c1d95",
        primary950: "#2e1065",
        primary1000: "#160633",

        //  Neutral
        neutral50: "#fafafa",
        neutral100: "#f5f5f5",
        neutral200: "#e5e5e5",
        neutral300: "#d4d4d4",
        neutral400: "#a3a3a3",
        neutral500: "#737373",
        neutral600: "#525252",
        neutral700: "#404040",
        neutral800: "#262626",
        neutral900: "#171717",
        neutral950: "#0a0a0a",
        neutral1000: "#0000004d",
        neutral1100: "#000000d7",
        // Red
        red500: "#ef4444",
        red600: "#dc2626",
        red700: "#b91c1c",
    },
    dark: {
        error100: '#ffc6c6',
        error400: "#f87171",
        error500: '#ef4444',

        // Violet
        primary50: "#160633",
        primary100: "#2e1065",
        primary200: "#4c1d95",
        primary300: "#5b21b6",
        primary400: "#6d28d9",
        primary500: "#7c3aed",
        primary600: "#8b5cf6",
        primary700: "#a78bfa",
        primary800: "#c4b5fd",
        primary900: "#ddd6fe",
        primary950: "#ede9fe",
        primary1000: "#f5f3ff",

        // Neutral
        neutral50: "#262626",
        neutral100: "#404040",
        neutral200: "#525252",
        neutral300: "#737373",
        neutral400: "#a3a3a3",
        neutral500: "#d4d4d4",
        neutral600: "#e5e5e5",
        neutral700: "#f5f5f5",
        neutral800: "#fafafa",
        neutral900: "#0000004d",
        neutral950: "#000000d7",
        neutral1000: "#000000",
        neutral1100: "#0a0a0a",

        // Red
        red500: "#ef4444",
        red600: "#dc2626",
        red700: "#b91c1c",
    },
};

const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => { },
    colors: themes.dark, // Default to light theme
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const colors = themes[theme];

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
}