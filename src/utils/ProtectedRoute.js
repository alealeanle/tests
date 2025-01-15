import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, admin }) => {
  const { isAuthenticated, isAdmin } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (admin && !isAdmin) {
    return <Navigate to="/tests" replace />;
  }

  return children;
};

export default ProtectedRoute;
