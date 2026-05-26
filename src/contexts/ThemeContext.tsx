import { createContext, useContext, useState, useEffect, type ReactElement } from 'react';
import type { ThemeMode, ColorTheme } from '../types';

interface ThemeContextValue {
  theme: 'light' | 'dark';
  mode: ThemeMode;
  toggleTheme: () => void;
  colorTheme: ColorTheme;
  setColorTheme: (c: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const getTimeBasedTheme = (): 'light' | 'dark' => {
  const hour = new Date().getHours();
  return (hour >= 6 && hour < 18) ? 'light' : 'dark';
};

const COLOR_THEMES: ColorTheme[] = ['blue', 'red', 'green', 'purple', 'orange'];

/** cookie 읽기 */
const getCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
};

/** cookie 쓰기 (1년 유지) */
const setCookie = (name: string, value: string): void => {
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=31536000;SameSite=Lax`;
};

/** cookie 삭제 */
const removeCookie = (name: string): void => {
  document.cookie = `${name}=;path=/;max-age=0`;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps): ReactElement => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = getCookie('themeMode');
    if (saved === 'light' || saved === 'dark' || saved === 'auto') return saved;
    return 'auto';
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return mode === 'auto' ? getTimeBasedTheme() : (mode as 'light' | 'dark');
  });

  const [colorTheme, setColorTheme] = useState<ColorTheme>(() => {
    const saved = getCookie('colorTheme');
    return (COLOR_THEMES as string[]).includes(saved ?? '') ? (saved as ColorTheme) : 'blue';
  });

  // Resolve theme from mode (+ time tick for auto)
  useEffect(() => {
    if (mode !== 'auto') {
      setTheme(mode as 'light' | 'dark');
      return;
    }
    setTheme(getTimeBasedTheme());
    const interval = setInterval(() => {
      setTheme(getTimeBasedTheme());
    }, 60000);
    return () => clearInterval(interval);
  }, [mode]);

  // Apply dark/light to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Apply color theme to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-color', colorTheme);
    setCookie('colorTheme', colorTheme);
  }, [colorTheme]);

  // Persist mode
  useEffect(() => {
    setCookie('themeMode', mode);
    removeCookie('theme'); // clean legacy
  }, [mode]);

  // Cycle: auto → light → dark → auto
  const toggleTheme = () => {
    setMode(prev => {
      if (prev === 'auto') return 'light';
      if (prev === 'light') return 'dark';
      return 'auto';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, mode, toggleTheme, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
