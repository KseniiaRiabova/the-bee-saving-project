import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  setAuth: (authState) =>
    set({
      isAuthenticated: authState.isAuthenticated,
      user: authState.user,
      isLoading: authState.isLoading,
      error: authState.error,
    }),
  resetAuth: () =>
    set({
      isAuthenticated: false,
      user: null,
      isLoading: false,
      error: null,
    }),
}));

export default useAuthStore;