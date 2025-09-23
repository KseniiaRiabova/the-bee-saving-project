import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ auth, children }) => {
  if (auth.isLoading) return null;
  if (!auth.isAuthenticated) return <Navigate to="/" replace />;

  return children;
};

ProtectedRoute.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};
