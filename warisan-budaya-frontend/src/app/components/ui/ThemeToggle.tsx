import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      title={theme === 'dark' ? 'Beralih ke Light Mode' : 'Beralih ke Dark Mode'}
      className={`
        relative flex items-center gap-1.5 rounded-full transition-all duration-300
        px-2 py-1
        ${theme === 'dark'
          ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-brand-card'
          : 'bg-sky-100 hover:bg-sky-200 text-sky-700'
        }
        ${className}
      `}
    >
      {/* Track */}
      <span
        className={`
          relative inline-flex items-center w-8 h-4 rounded-full transition-colors duration-300 shrink-0
          ${theme === 'dark' ? 'bg-gray-600' : 'bg-sky-500'}
        `}
      >
        {/* Thumb */}
        <span
          className={`
            absolute w-3 h-3 rounded-full bg-white shadow transition-transform duration-300
            ${theme === 'dark' ? 'translate-x-0.5' : 'translate-x-4'}
          `}
        />
      </span>
      {theme === 'dark' ? (
        <Moon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
      ) : (
        <Sun className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
      )}
    </button>
  );
}
