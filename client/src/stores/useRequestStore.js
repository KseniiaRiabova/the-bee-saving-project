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

  addRequest: async (formData, token) => {
    set({ isLoading: true });
    try {
      // Transform data before sending
      const { latitude, longitude, city, country, ...restFormData } = formData;

      const requestData = {
        ...restFormData,
        location: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)], // GeoJSON order: [lon, lat]
          city: city || '',
          country: country || '',
        },
      };

      const response = await fetch(`${BACKEND_URL}/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error('Failed to create request');

      const data = await response.json();

      set((state) => ({
        requests: [...state.requests, data.request], // Note: backend returns data.request
        activeRequests: data.request.isActive
          ? state.activeRequests + 1
          : state.activeRequests,
        completedRequests: data.request.isCompleted
          ? state.completedRequests + 1
          : state.completedRequests,
        isLoading: false,
        error: null,
      }));

      return data.request;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  updateRequest: async (updatedRequest, token) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${BACKEND_URL}/requests/${updatedRequest.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedRequest),
        }
      );
      if (!response.ok) throw new Error('Failed to update request');
      const data = await response.json();
      set((state) => ({
        requests: state.requests.map((req) =>
          req.id === data.id ? data : req
        ),
        isLoading: false,
        error: null,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  deleteRequest: async (requestId, token) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BACKEND_URL}/requests/${requestId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete request');
      set((state) => ({
        requests: state.requests.filter((req) => req.id !== requestId),
        isLoading: false,
        error: null,
      }));
      return requestId;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  acceptRequest: async (requestId, userId, token) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${BACKEND_URL}/requests/${requestId}/accept`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ beekeeperId: userId }),
        }
      );
      if (!response.ok) throw new Error('Failed to accept request');
      const data = await response.json();
      set((state) => ({
        requests: state.requests.map((req) =>
          req.id === data.request.id ? data.request : req
        ),
        isLoading: false,
        error: null,
      }));
      return data.request;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  completeRequest: async (requestId, token) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${BACKEND_URL}/requests/${requestId}/complete`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error('Failed to complete request');
      const data = await response.json();
      set((state) => ({
        requests: state.requests.map((req) =>
          req.id === data.request.id ? data.request : req
        ),
        isLoading: false,
        error: null,
      }));
      return data.request;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  cancelRequest: async (requestId, token) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${BACKEND_URL}/requests/${requestId}/cancel`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error('Failed to cancel request');
      const data = await response.json();
      set((state) => ({
        requests: state.requests.map((req) =>
          req.id === data.id ? data : req
        ),
        isLoading: false,
        error: null,
      }));
      return data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },
}));

export default useRequestStore;
