import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectRefreshingStatus,
  selectUserId,
} from '../../redux/auth/authSelectors';
import { selectIsLoading } from '../../redux/nannies/nanniesSelectors';

export const PrivateRoute = ({ children, redirectTo = '/' }) => {
  // const { refreshingStatus, loading, loggedInStatus } = useAuth();
  const refreshingStatus = useSelector(selectRefreshingStatus);
  const loggedInStatus = useSelector(selectIsLoggedIn);
  const loading = useSelector(selectIsLoading);
  const id = useSelector(selectUserId);

  // const [shouldRedirect, setShouldRedirect] = useState(false);

  const shouldRedirect = !loggedInStatus && !refreshingStatus && !id;
  console.log(shouldRedirect);
  // setShouldRedirect(!loggedInStatus && !refreshingStatus);
  // useEffect(() => {
  //   setShouldRedirect(!loggedInStatus && !refreshingStatus); //&& !loading
  // }, [refreshingStatus, loggedInStatus]); //loading,

  return shouldRedirect ? <Navigate to={redirectTo} replace /> : children;
};
