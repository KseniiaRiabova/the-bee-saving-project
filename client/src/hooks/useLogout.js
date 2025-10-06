import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

/**
 * Custom hook for handling logout functionality
 * @returns {Function} A memoized logout function
 */
export const useLogout = () => {
  const { logout } = useAuth0();

  const handleLogout = useCallback(() => {
    try {
      const returnToUrl = import.meta.env.VITE_AUTH0_CALLBACK_URI;

      if (!returnToUrl) {
        throw new Error('Auth0 callback URI is not defined in environment variables');
      }

      console.log('🔁 Logging out to:', returnToUrl);

      logout({
        logoutParams: {
          returnTo: returnToUrl,
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [logout]);

  return handleLogout;
};
