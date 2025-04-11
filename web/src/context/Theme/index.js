import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

const SetThemeContext = createContext(null);
export const useSetTheme = () => useContext(SetThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, _setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme-mode') || 'light';
    } catch {
      return 'light';
    }
  });

  const setTheme = useCallback((input) => {
    const newTheme = input ? 'dark' : 'light';
    _setTheme(newTheme);
    try {
      localStorage.setItem('theme-mode', newTheme);
    } catch {
      console.warn('Failed to save theme to localStorage');
    }
    const root = document.documentElement;
    const body = document.body;
    // Toggle 'dark' class on both <html> and <body>
    root.classList.toggle('dark', newTheme === 'dark');
    body.classList.toggle('dark', newTheme === 'dark');
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-mode');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const effectiveTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    const root = document.documentElement;
    const body = document.body;
    // Set initial 'dark' class on both <html> and <body>
    root.classList.toggle('dark', effectiveTheme === 'dark');
    body.classList.toggle('dark', effectiveTheme === 'dark');
    _setTheme(effectiveTheme);
  }, []);

  return (
    <SetThemeContext.Provider value={setTheme}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </SetThemeContext.Provider>
  );
};
