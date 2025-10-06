import { create } from 'zustand';

const useDarkModeStore = create((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => {
    const newMode = !state.isDarkMode;
    if (newMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    return { isDarkMode: newMode };
  }),
}));

export default useDarkModeStore;