import { useSelector } from 'react-redux';
import {
  selectUser,
  selectLoading,
  selectError,
  selectIsLoggedIn,
  selectRefreshingStatus,
} from '../redux/auth/authSelectors';

export const useAuth = () => {
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const user = useSelector(selectUser);
  const loggedInStatus = useSelector(selectIsLoggedIn);
  const refreshingStatus = useSelector(selectRefreshingStatus);
  // const token = useSelector(getToken);
  return {
    loading,
    error,
    user,
    loggedInStatus,
    refreshingStatus,
    // token,
  };
};
