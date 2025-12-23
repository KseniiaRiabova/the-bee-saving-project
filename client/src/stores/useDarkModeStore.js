import { create } from 'zustand';

const useDarkModeStore = create((set) => ({
  isDarkMode: false,
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.isDarkMode;
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { isDarkMode: newMode };
    }),
}));

export default useDarkModeStore;
