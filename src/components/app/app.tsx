import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useEffect } from 'react';
import { useAppDispatch } from '../../services/store';
import { fetchIngredients } from '../../slices/ingredientsSlice';

const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <Routes>
        <Route path='/' element={<AppHeader />}>
          <Route index element={<ConstructorPage />} />

          <Route path='/feed'>
            <Route index element={<Feed />} />
            <Route
              path=':number'
              element={
                <Modal title='Информация о заказе' onClose={onClose}>
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>

          <Route path='/ingredients'>
            <Route
              path=':id'
              element={
                <Modal title='Окно ингредиента' onClose={onClose}>
                  <IngredientDetails />
                </Modal>
              }
            />
          </Route>

          <Route path='/profile'>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path='orders'>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <ProfileOrders />
                  </ProtectedRoute>
                }
              />

              <Route
                path=':number'
                element={
                  <ProtectedRoute>
                    <OrderInfo />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Route>

        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
