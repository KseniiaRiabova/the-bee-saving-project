import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../components/protectedRoute';
import HomeLayout from '../layout/HomeLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import useAuthStore from '../stores/useAuthStore';
import { AuthRedirect } from '../components/AuthRedirect';
import { BaseLayout } from '../layout/BaseLayout';

const AppRoutes = () => {
  const auth = useAuthStore();

  return (
    <>
      {/* Redirect logged-in users to dashboard  */}
      <AuthRedirect />

      <Routes>
        <Route
          path='/'
          element={<BaseLayout />}
        >
          <Route
            index
            element={<HomeLayout />}
          />

          <Route
            path='/dashboard'
            element={
              <ProtectedRoute auth={auth}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
