import { create } from 'zustand';
import { BACKEND_URL } from '../components/configs/envConfig';

const useUserStore = create((set) => ({
  userData: null,
  isLoading: false,
  error: null,

  fetchUserData: async (token) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BACKEND_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      set({
        userData: data.user,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateUserData: (userData) => set({ userData }),

  resetUserData: () => set({
    userData: null,
    isLoading: false,
    error: null,
  }),
}));

export default useUserStore;