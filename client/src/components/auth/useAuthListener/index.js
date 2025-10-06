import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import useAuthStore from "../../../stores/useAuthStore";

export const useAuthListener = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    setAuth({ isAuthenticated, user, isLoading });
  }, [setAuth, isAuthenticated, user, isLoading]);

  return { isLoading, isAuthenticated, user };
};
