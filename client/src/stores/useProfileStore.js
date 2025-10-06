import { create } from 'zustand';
import { BACKEND_URL } from '../components/configs/envConfig';

const useProfileStore = create((set) => ({
  email: '',
  gravatar: '',
  contactNumber: '',
  isEditable: false,
  isUserInfoModalOpen: false,
  isLoading: true,
  error: null,

  setProfileData: (data) => set({
    email: data.email,
    gravatar: data.gravatar,
    contactNumber: data.metadata?.contactNumber || '',
    isLoading: false,
  }),

  setEditable: (isEditable) => set({ isEditable }),

  setUserInfoModalOpen: (isOpen) => set({ isUserInfoModalOpen: isOpen }),

  setContactNumber: (contactNumber) => set({ contactNumber }),

  updateContactNumber: async (token, contactNumber) => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/metadata`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metadata: { contactNumber } }),
      });

      if (!response.ok) throw new Error('Failed to update contact number');

      const data = await response.json();
      set({
        contactNumber: data.user.metadata?.contactNumber || '',
        isEditable: false,
        error: null,
      });
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteContactNumber: async (token) => {
    try {
      const response = await fetch(`${BACKEND_URL}/user/metadata`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ metadata: { contactNumber: null } }),
      });

      if (!response.ok) throw new Error('Failed to delete contact number');

      set({
        contactNumber: '',
        error: null,
      });
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));

export default useProfileStore;