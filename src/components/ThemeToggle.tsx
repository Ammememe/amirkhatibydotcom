import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-24 z-50 p-2 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <div className="flex flex-col items-center">
          <Sun className="w-6 h-6 text-white" />
          <span className="text-white text-xs mt-0.5 font-medium">SWE</span>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Moon className="w-6 h-6 text-black" />
          <span className="text-black text-xs mt-0.5 font-medium">ENG</span>
        </div>
      )}
    </button>
  );
};

export default ThemeToggle; 