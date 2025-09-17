import { Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '../components/protectedRoute';
import HomeLayout from '../layout/HomeLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import Solutions from '../components/UI/Solutions';
import { useAuthListener } from '../components/auth/useAuthListener';

const AppRoutes = () => {
  const auth = useAuthListener();

  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} />
      <Route path="/solutions" element={<Solutions />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute auth={auth}><Dashboard /></ProtectedRoute>}
      />
    </Routes>
  );
};

export default AppRoutes;
