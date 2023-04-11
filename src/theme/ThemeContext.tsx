import React, { useState } from "react";
import { Provider } from "@react-native-material/core";

export type ThemeType = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  changeTheme: (value: string) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
  changeTheme: (value) => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const changeTheme = (theme: string) => {
    setTheme(theme);
  }

  const themeContextValue = {
    theme,
    toggleTheme,
    changeTheme
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <Provider>
      {children}
      </Provider>
    </ThemeContext.Provider>
  );
}
