import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../components/protectedRoute';
import HomeLayout from '../layout/HomeLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import { useAuthListener } from '../components/auth/useAuthListener';
import { AuthRedirect } from '../components/AuthRedirect';

const AppRoutes = () => {
  const auth = useAuthListener();

  return (
    <>
      {/* Redirect logged-in users to dashboard */}
      <AuthRedirect />

      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/home" element={<HomeLayout />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute auth={auth}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
