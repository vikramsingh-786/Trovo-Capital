'use client';

/**
 * Theme provider that manages light/dark theme state and persistence.
 *
 * Initializes theme from:
 * 1. Saved localStorage preference
 * 2. System preference (prefers-color-scheme)
 * 3. Light as fallback
 *
 * Prevents flash of wrong theme by setting the initial theme before render.
 * Persists theme preference to localStorage.
 *
 * The theme initialization runs synchronously in a script tag before React
 * hydrates, so no client-side state management is needed for the initial
 * theme selection.
 */
export function ThemeProvider() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              // Get saved preference or system preference
              const saved = localStorage.getItem('theme');
              const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = saved || (systemDark ? 'dark' : 'light');

              // Set immediately before paint to prevent flash
              if (theme === 'dark') {
                document.documentElement.setAttribute('data-theme', 'dark');
              }

              // Save preference
              localStorage.setItem('theme', theme);
            } catch (e) {
              // localStorage might be disabled
            }
          })();
        `,
      }}
    />
  );
}
