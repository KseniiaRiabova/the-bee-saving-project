import { create } from 'zustand';
import { BACKEND_URL } from '../components/configs/envConfig';

const useProfileStore = create((set, get) => ({
  email: '',
  gravatar: '',
  contactNumber: '',
  isEditable: false,
  isUserInfoModalOpen: false,
  isLoading: false,
  error: null,

  setProfileData: (data) =>
    set({
      email: data.email,
      gravatar: data.gravatar || '/default-user.png',
      contactNumber: data.metadata?.contactNumber || '',
      isLoading: false,
    }),

  setEditable: (isEditable) => set({ isEditable }),

  setUserInfoModalOpen: (isOpen) => set({ isUserInfoModalOpen: isOpen }),

  setContactNumber: (contactNumber) => set({ contactNumber }),

  _patchUserMetadata: async (token, metadata) => {
    const response = await fetch(`${BACKEND_URL}/user/metadata`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ metadata }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to update metadata: ${errText}`);
    }

    const data = await response.json();
    return data.user;
  },

  updateContactNumber: async (token, contactNumber, refetchUserData) => {
    set({ contactNumber, isEditable: false, isLoading: true, error: null });
    try {
      const user = await get()._patchUserMetadata(token, { contactNumber });

      // Sync with backend response (in case of normalization)
      set({
        email: user.email,
        gravatar: user.gravatar || '/default-user.png',
        contactNumber: user.metadata?.contactNumber || contactNumber || '',
        isEditable: false,
        isLoading: false,
        error: null,
      });

      // Optional delayed refetch for propagation lag (e.g. Auth0)
      if (refetchUserData) {
        setTimeout(() => refetchUserData(token), 500);
      }

      return user;
    } catch (error) {
      console.error('ProfileStore.updateContactNumber error:', error);
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },

  deleteContactNumber: async (token, refetchUserData) => {
    set({ contactNumber: '', isLoading: true, error: null });
    try {
      const user = await get()._patchUserMetadata(token, { contactNumber: null });

      set({
        email: user.email,
        gravatar: user.gravatar || '/default-user.png',
        contactNumber: '',
        isEditable: false,
        isLoading: false,
        error: null,
      });

      if (refetchUserData) {
        setTimeout(() => refetchUserData(token), 500);
      }

      return user;
    } catch (error) {
      console.error('ProfileStore.deleteContactNumber error:', error);
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
}));

export default useProfileStore;
