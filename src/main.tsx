import React, { ReactNode, useState } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import './index.css';

type ThemeContextProp = { darkTheme: boolean; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContextProp | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

function ThemeContextProvider({ children }: ThemeProviderProps) {
  const [darkTheme, setDarkTheme] = useState(true);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }
  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
);
