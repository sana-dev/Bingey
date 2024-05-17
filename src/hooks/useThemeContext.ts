import { useContext } from 'react';
import { ThemeContext } from '../main';

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error('This hook should be used within ThemContextProvider');
  }

  return context;
}
