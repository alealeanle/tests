import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserRequest } from '@models/authSlice';
import Loading from '@commons/Loading';

const ProtectedRoute = ({ children, admin }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, isAdmin, loading } = useSelector(
    state => state.auth,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(fetchUserRequest());
    }
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (admin && !isAdmin) {
    return <Navigate to={'/tests'} replace />;
  }

  return children;
};

export default ProtectedRoute;
