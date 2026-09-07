'use client';

import { useState } from 'react';

/**
 * Theme toggle control. Displays current theme and allows switching.
 *
 * Minimal editorial treatment: text-based toggle that fits seamlessly
 * into the navigation without introducing visual clutter or icon dependencies.
 */
function getInitialTheme(): 'light' | 'dark' {
  if (typeof document === 'undefined') return 'light';
  return (
    (document.documentElement.getAttribute('data-theme') as 'light' | 'dark') ||
    'light'
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Update DOM
    if (newTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Persist preference
    try {
      localStorage.setItem('theme', newTheme);
    } catch {
      // localStorage might be disabled
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="eyebrow text-foreground-muted transition-colors duration-base ease-standard hover:text-foreground active:text-accent"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
}
