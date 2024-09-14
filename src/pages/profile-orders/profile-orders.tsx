import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';
import {
  fetchGetUserOrders,
  userOrdersSelector
} from '../../slices/orderSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */

  const dispatch = useAppDispatch();
  const orders: TOrder[] = useAppSelector(userOrdersSelector);

  useEffect(() => {
    dispatch(fetchGetUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
