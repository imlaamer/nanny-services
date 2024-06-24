import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';

import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import SharedLayout from './components/common/SharedLayout/SharedLayout';
import Loader from './components/common/Loader/Loader';

import {
  selectLoadingUser,
} from './redux/auth/authSelectors';
import { getUser } from './redux/auth/authOperations';

import './assets/styles/global.module.css';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const NanniesPage = lazy(() => import('pages/NanniesPage/NanniesPage'));
const FavoritesPage = lazy(() => import('pages/FavoritesPage/FavoritesPage'));
const ErrorPage = lazy(() => import('pages/ErrorPage/ErrorPage'));

const App = () => {
  const dispatch = useDispatch();
  const isLoadingUser = useSelector(selectLoadingUser);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]); 

  if (isLoadingUser) {
    return <Loader />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />

          <Route path="nannies" element={<NanniesPage />} />

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
