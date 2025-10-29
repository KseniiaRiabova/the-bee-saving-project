import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthListener } from "../components/auth/useAuthListener";

export const AuthRedirect = () => {
  const { isAuthenticated } = useAuthListener();
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (isAuthenticated && !hasRedirected.current) {
      hasRedirected.current = true; // redirect only once
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return null;
};
