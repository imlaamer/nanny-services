import { Route, Routes } from 'react-router-dom';
import { lazy, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import SharedLayout from './components/common/SharedLayout/SharedLayout';
// import { RestrictedRoute } from '../RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

import './assets/styles/global.module.css';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/authOperations';
import { selectRefreshingStatus } from './redux/auth/authSelectors';
import Loader from './components/common/Loader/Loader';
import { login } from './services/auth-api';
import { getAuth, getIdToken, onAuthStateChanged } from 'firebase/auth';
import { child, get, ref } from 'firebase/database';
import { db } from './firebase';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const NanniesPage = lazy(() => import('pages/NanniesPage/NanniesPage'));
const FavoritesPage = lazy(() => import('pages/FavoritesPage/FavoritesPage'));
const ErrorPage = lazy(() => import('pages/ErrorPage/ErrorPage'));

const App = () => {
  const dispatch = useDispatch();

  const refreshingStatus = useSelector(selectRefreshingStatus);

  useEffect(() => {
    // dispatch(refreshUser());

    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return;
      }
      const token = await getIdToken(user);
      if (!token) {
        return toast.error('No token');
      }
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `users/${user.uid}`));
      if (!snapshot.exists()) {
        return toast.error('No user data');
      }
      const { email, username, favorites: newFavorites = [] } = snapshot.val();
      const favorites = Object.values(newFavorites);
      const data = { email, username, favorites, id: user.uid };

      dispatch(refreshUser(data)); //token  -?
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (refreshingStatus ) {
    //&& !auth.current user
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />

          <Route
            path="nannies"
            element={
              // <RestrictedRoute>
              <NanniesPage />
              // </RestrictedRoute>
            }
          />

          <Route
            path="favorites"
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={5000} theme="light" />
    </>
  );
};
export default App;
