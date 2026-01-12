import { create } from 'zustand';

const useDarkModeStore = create((set) => {
  const storedMode = typeof window !== 'undefined'
    ? localStorage.getItem('darkMode')
    : null;
  const initialDarkMode = storedMode === null ? true : storedMode === 'true';

  if (typeof document !== 'undefined') {
    if (initialDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  return {
    isDarkMode: initialDarkMode,
    toggleDarkMode: () =>
      set((state) => {
        const newMode = !state.isDarkMode;

        if (typeof document !== 'undefined') {
          if (newMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }

          localStorage.setItem('darkMode', newMode);
        }

        return { isDarkMode: newMode };
      }),
  };
});

export default useDarkModeStore;
