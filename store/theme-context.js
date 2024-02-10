import React, { createContext, useContext, useState } from 'react';

// Define your themes here
const themes = {
    light: {
        // error
        error100: '#ffc6c6',
        error400: "#f87171",
        error500: '#ef4444',

        // Backgrounds colors
        // Primary
        background100: "#ede9fe",
        //modal background
        background1000: "#160633",
        // TaskHome and Banner
        background50: "#f5f3ff",
        // Background of profile information component icons
        background300: "#c4b5fd",
        // Forms background colors
        background800: "#5b21b6",
        background900: "#4c1d95",
        background500: "#8b5cf6",

        // Texts colors
        // Title
        text900: "#4c1d95",
        // subtitle
        text800: "#5b21b6",
        // others text
        text700: "#ffffff",
        text50: "#000000",
        text100: "#4c1d95",

        // Swichs colors
        // Cirle
        swich200: "#ddd6fe",
        // Background Active and Inactive
        swich950: "#2e1065",
        swich500: "#8b5cf6",
        swich400: "#a3a3a3",

        // Buttons colors
        btnPrimary900: "#4c1d95",
        btnAdd50: "#f5f3ff", 

        // Icons colors
        icons50: "#000000",
        icons400: "#a78bfa",
        icons500: "#4c1d95",
        icons800: "#5b21b6",
        icons900: "#171717",

        // Tab bar colors
        bgTabBar900: "#4c1d95",
        icons100: "#ede9fe",
        iconFocused400: "#a3a3a3",

        // Borders
        border950: "#2e1065",
        border900: '#4c1d95',
        border100: "#ede9fe",


        // primary50: "#f5f3ff",
        // primary200: "#ddd6fe",
        // primary300: "#c4b5fd",
        // primary400: "#a78bfa",
        // primary500: "#8b5cf6",
        // primary600: "#7c3aed",
        // primary700: "#6d28d9",
        // primary800: "#5b21b6",
        // primary900: "#4c1d95",
        // primary950: "#2e1065",

        // //  Neutral
        // neutral50: "#fafafa",
        // neutral100: "#f5f5f5",
        // neutral200: "#e5e5e5",
        // neutral300: "#d4d4d4",
        // neutral400: "#a3a3a3",
        // neutral500: "#737373",
        // neutral600: "#525252",
        // neutral700: "#404040",
        // neutral800: "#262626",
        // neutral900: "#171717",
        // neutral950: "#0a0a0a",
        // neutral1000: "#0000004d",
        //neutral1100: "#000000d7",

        // // Red
        // red500: "#ef4444",
        // red600: "#dc2626",
        // red700: "#b91c1c",
    },
    dark: {
       // error
       error100: '#ffc6c6',
       error400: "#f87171",
       error500: '#ef4444',

       // Backgrounds colors
       // Primary
       background100: "#363636",
       //modal background
       background1000: "#160633",
       // TaskHome and Banner
       background50: "#000",
       // Background of profile information component icons
       background300: "#c4b5fd",
       // Forms background colors
       background800: "#5b21b6",
       background900: "#4c1d95",
       background500: "#8b5cf6",
        
       // Texts colors
       // Title
       text900: "#8b5cf6",
       // subtitle
       text800: "#c4b5fd",
       // others text
       text700: "#ffffff",
       text50: "#f5f3ff",
       text100: "#fff",

       // Swichs colors
       // Cirle
       swich200: "#ddd6fe",
       // Background Active and Inactive
       swich950: "#2e1065",
       swich500: "#8b5cf6",
       swich400: "#a3a3a3",

       // Buttons colors
       btnPrimary900: "#4c1d95",
       btnAdd50: '#4c1d95', 

       // Icons colors
       icons50: "#f5f3ff",
       icons400: "#a78bfa",
       icons500: "#4c1d95",
       icons800: "#ffffff",
       icons900: "#171717",

       // Tab bar colors
       bgTabBar900: "#4c1d95",
       icons100: "#ede9fe",
       iconFocused400: "#a3a3a3",

       // Borders
       border950: "#2e1065",
       border900: '#4c1d95',
       border100: "#ede9fe",
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
