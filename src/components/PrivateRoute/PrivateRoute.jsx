import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectRefreshingStatus,
  selectUserId,
} from '../../redux/auth/authSelectors';
import { selectIsLoading } from '../../redux/nannies/nanniesSelectors';

export const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const refreshingStatus = useSelector(selectRefreshingStatus);
  const loggedInStatus = useSelector(selectIsLoggedIn);
  const id = useSelector(selectUserId);
  const loading = useSelector(selectIsLoading);

  const shouldRedirect = !loggedInStatus && !refreshingStatus; //&& !id

  return shouldRedirect ? <Navigate to={redirectTo} replace /> : children;
};
