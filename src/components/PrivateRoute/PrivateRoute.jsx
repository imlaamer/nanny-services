import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectLoadingUser,
} from '../../redux/auth/authSelectors';

export const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const loggedInStatus = useSelector(selectIsLoggedIn);
  const loadingUser = useSelector(selectLoadingUser);

  const shouldRedirect = !loggedInStatus && !loadingUser;

  return shouldRedirect ? <Navigate to={redirectTo} replace /> : children;
};
