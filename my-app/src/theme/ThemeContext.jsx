// Imports. 
import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';

// Theme Context.
const ThemeContext = createContext();

// Theme Provider.
export const ThemeProvider = ({ children }) => {
  // State.
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : true;
  });

  // Use Effect.
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark));
  }, [isDark]);

  // Toggle Theme.
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Return.
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <StyledThemeProvider theme={isDark ? darkTheme : lightTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Export.
export const useTheme = () => useContext(ThemeContext); 