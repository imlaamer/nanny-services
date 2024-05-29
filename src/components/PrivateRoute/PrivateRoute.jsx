import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const { loggedInStatus, isRefreshing } = useAuth();

  const shouldRedirect = !loggedInStatus && !isRefreshing;
  return shouldRedirect ? <Navigate to={redirectTo} replace /> : children;
};
