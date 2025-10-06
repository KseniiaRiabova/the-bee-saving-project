import { create } from 'zustand';
import { BACKEND_URL } from '../components/configs/envConfig';

const useRequestStore = create((set, get) => ({
  requests: [],
  activeRequests: 0,
  completedRequests: 0,
  isLoading: false,
  error: null,

  fetchRequests: async (token) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BACKEND_URL}/requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      const active = data.requests.filter((r) => r.isActive).length || 0;
      const completed = data.requests.filter((r) => r.isCompleted).length || 0;

      set({
        requests: data.requests || [],
        activeRequests: active,
        completedRequests: completed,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  addRequest: (request) =>
    set((state) => ({
      requests: [...state.requests, request],
      activeRequests: request.isActive ? state.activeRequests + 1 : state.activeRequests,
      completedRequests: request.isCompleted ? state.completedRequests + 1 : state.completedRequests,
    })),

  updateRequest: (updatedRequest) =>
    set((state) => ({
      requests: state.requests.map((req) =>
        req.id === updatedRequest.id ? updatedRequest : req
      ),
    })),

  deleteRequest: (requestId) =>
    set((state) => ({
      requests: state.requests.filter((req) => req.id !== requestId),
    })),
}));

export default useRequestStore;