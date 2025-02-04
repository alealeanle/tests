import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { fetchUserRequest } from '@models/authSlice';
import Loading from '@commons/Loading';

const IsAuthenticatedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchUserRequest());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to="/tests" replace />;
  }

  return children;
};

export default IsAuthenticatedRoute;
