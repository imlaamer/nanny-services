import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';

export const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const { refreshingStatus, loading, loggedInStatus } = useAuth();

  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    setShouldRedirect(!loggedInStatus && !refreshingStatus && !loading);
  }, [refreshingStatus, loading, loggedInStatus]);

  return shouldRedirect ? <Navigate to={redirectTo} replace /> : children;
};
